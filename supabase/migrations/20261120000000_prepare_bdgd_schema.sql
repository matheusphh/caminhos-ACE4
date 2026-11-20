-- Enable PostGIS in Supabase's extensions schema and keep BDGD data private.
CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA extensions;

CREATE SCHEMA IF NOT EXISTS bdgd AUTHORIZATION postgres;
REVOKE ALL ON SCHEMA bdgd FROM PUBLIC, anon, authenticated;
GRANT USAGE, CREATE ON SCHEMA bdgd TO postgres;

-- Move data created by the previous local/public schema layout, if present.
DO $$
DECLARE
    table_name text;
BEGIN
    FOREACH table_name IN ARRAY ARRAY[
        'bdgd_ssdmt', 'bdgd_ssdbt', 'bdgd_untrd', 'bdgd_sub'
    ] LOOP
        IF to_regclass(format('public.%I', table_name)) IS NOT NULL
           AND to_regclass(format('bdgd.%I', table_name)) IS NULL THEN
            EXECUTE format('ALTER TABLE public.%I SET SCHEMA bdgd', table_name);
        END IF;
    END LOOP;
END
$$;

REVOKE ALL ON ALL TABLES IN SCHEMA bdgd FROM PUBLIC, anon, authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA bdgd
    REVOKE ALL ON TABLES FROM PUBLIC, anon, authenticated;
