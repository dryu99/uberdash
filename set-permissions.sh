#!/bin/bash

# recursively traverse through backend files and set appropriate permissions
find backend/ -type d -exec chmod 711 {} \;
find backend/ -type f -exec chmod 755 {} \;

