--
-- PostgreSQL database dump
--

-- Dumped from database version 10.3
-- Dumped by pg_dump version 10.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: contacts; Type: TABLE; Schema: public; Owner: bengamber
--

CREATE TABLE public.contacts (
    id uuid NOT NULL,
    email character varying(200) NOT NULL,
    first character varying(200),
    last character varying(200),
    phone character varying(200)
);


ALTER TABLE public.contacts OWNER TO bengamber;

--
-- Name: groups; Type: TABLE; Schema: public; Owner: bengamber
--

CREATE TABLE public.groups (
    id integer NOT NULL,
    name character varying(200) NOT NULL
);


ALTER TABLE public.groups OWNER TO bengamber;

--
-- Data for Name: contacts; Type: TABLE DATA; Schema: public; Owner: bengamber
--

COPY public.contacts (id, email, first, last, phone) FROM stdin;
8bfcade3-445c-45ae-bb4f-f90eb49857d4	ben.gamber@gmail.com	Ben	\N	\N
7b306ea9-0ec0-4037-af2d-e6ae06e7cfeb	dude@dude.dude	Dude	\N	\N
\.


--
-- Data for Name: groups; Type: TABLE DATA; Schema: public; Owner: bengamber
--

COPY public.groups (id, name) FROM stdin;
\.


--
-- Name: contacts contacts_id_key; Type: CONSTRAINT; Schema: public; Owner: bengamber
--

ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT contacts_id_key UNIQUE (id);


--
-- Name: groups groups_id_key; Type: CONSTRAINT; Schema: public; Owner: bengamber
--

ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_id_key UNIQUE (id);


--
-- PostgreSQL database dump complete
--

