<?php
  class Database {
    private $db_uri = 'dbhost.students.cs.ubc.ca:1522/stu';
    private $username = 'ora_dryu';
    private $password = 'a23276561';
    private $statement = null;
    public $db_conn = null;

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

    public function execute($sql, $bindvars = array()) {
      $this->statement = OCIParse($this->db_conn, $sql);

      foreach ($bindvars as $bv) {
          // OCIBindByName(resource, bv_name, php_variable)
          OCIBindByName($this->statement, $bv[0], $bv[1]);
      }

      OCIExecute($this->statement); // will auto commit
  }

    public function executeFetchAll($sql, $bindvars = array()) {
      $this->execute($sql, $bindvars);
      oci_fetch_all($this->statement, $result, null, null, OCI_FETCHSTATEMENT_BY_ROW);
      $this->statement = null;  // free the statement resource
      return($result);
    }
  }
?>