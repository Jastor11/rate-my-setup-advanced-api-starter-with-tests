\echo 'Delete and recreate rate_my_setup_advanced db?'
\prompt 'Return for yes or control-C to cancel > ' answer

DROP DATABASE rate_my_setup_advanced;
CREATE DATABASE rate_my_setup_advanced;
\connect rate_my_setup_advanced

\i rate-my-setup-schema.sql
\i rate-my-setup-seed.sql

\echo 'Delete and recreate rate_my_setup_advanced_test db?'
\prompt 'Return for yes or control-C to cancel > ' answer

DROP DATABASE rate_my_setup_advanced_test;
CREATE DATABASE rate_my_setup_advanced_test;
\connect rate_my_setup_advanced_test

\i rate-my-setup-schema.sql
\i rate-my-setup-seed.sql
