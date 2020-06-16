<?php
  include_once '../../environment.php';

  class Database {
    private $db_uri;
    private $username;
    private $password;
    private $statement = null;
    public $db_conn = null;

    public function __construct(){
      $this->db_uri = $_ENV['db_uri'];
      $this->username = $_ENV['db_username'];
      $this->password = $_ENV['db_password'];
    }

    public function connect() {
      $this->db_conn = OCILogon($this->username, $this->password, $this->db_uri);

      if (!$this->db_conn) {
        $m = oci_error();

        // return response with error message 
        echo json_encode(
          array('message' => $m['message'])
        );
        
        // stop server execution
        throw new \Exception('Cannot connect to database: ' . $m['message']);
      }
    }

    public function disconnect() {
      OCILogoff($this->db_conn);
    }

    /**
     * Run a SQL statement
     *
     * Call like:
     *     db->execute("INSERT INTO MyTable VALUES (:c1, :c2)",
     *                  array(array(":c1", $c1),
     *                        array(":c2", $c2)))
     *
     * Note: this performs a commit if the sql is valid and doesn't violate any constraints.
     *
     * @param string $sql The statement to run
     * @param array $bindvars Binds. An array of (bv_name, php_variable)
     */
    public function execute($sql, $bindvars = array()) {
      $this->statement = OCIParse($this->db_conn, $sql);

      foreach ($bindvars as $bv) {
          // OCIBindByName(resource, bv_name, php_variable)
          OCIBindByName($this->statement, $bv[0], $bv[1]);
      }

      return OCIExecute($this->statement);
    }

    /**
     * Run a query and return all rows.
     *
     * @param string $sql A query to run and return all rows
     * @param array $bindvars Binds. An array of (bv_name, php_variable)
     * @return array An array of rows
     */
    public function executeFetchAll($sql, $bindvars = array()) {
      $this->execute($sql, $bindvars);
      oci_fetch_all($this->statement, $result, null, null, OCI_FETCHSTATEMENT_BY_ROW);
      $this->statement = null;  // free the statement resource
      return($result);
    }
  }
?>