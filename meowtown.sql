--
-- PostgreSQL database dump
--

-- Dumped from database version 11.0
-- Dumped by pg_dump version 11.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: items; Type: TABLE; Schema: public; Owner: boomtown
--

CREATE TABLE public.items (
    id integer NOT NULL,
    title text NOT NULL,
    imageurl text,
    description text NOT NULL,
    ownerid integer,
    borrowerid integer,
    created timestamp with time zone DEFAULT now(),
    CONSTRAINT items_check CHECK ((borrowerid <> ownerid))
);


ALTER TABLE public.items OWNER TO boomtown;

--
-- Name: items_id_seq; Type: SEQUENCE; Schema: public; Owner: boomtown
--

CREATE SEQUENCE public.items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.items_id_seq OWNER TO boomtown;

--
-- Name: items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: boomtown
--

ALTER SEQUENCE public.items_id_seq OWNED BY public.items.id;


--
-- Name: itemtags; Type: TABLE; Schema: public; Owner: boomtown
--

CREATE TABLE public.itemtags (
    itemid integer,
    tagid integer
);


ALTER TABLE public.itemtags OWNER TO boomtown;

--
-- Name: tags; Type: TABLE; Schema: public; Owner: boomtown
--

CREATE TABLE public.tags (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.tags OWNER TO boomtown;

--
-- Name: tags_id_seq; Type: SEQUENCE; Schema: public; Owner: boomtown
--

CREATE SEQUENCE public.tags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tags_id_seq OWNER TO boomtown;

--
-- Name: tags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: boomtown
--

ALTER SEQUENCE public.tags_id_seq OWNED BY public.tags.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: boomtown
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    bio text DEFAULT 'No bio provided.'::text NOT NULL,
    CONSTRAINT valid_email CHECK ((email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'::text))
);


ALTER TABLE public.users OWNER TO boomtown;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: boomtown
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO boomtown;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: boomtown
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: items id; Type: DEFAULT; Schema: public; Owner: boomtown
--

ALTER TABLE ONLY public.items ALTER COLUMN id SET DEFAULT nextval('public.items_id_seq'::regclass);


--
-- Name: tags id; Type: DEFAULT; Schema: public; Owner: boomtown
--

ALTER TABLE ONLY public.tags ALTER COLUMN id SET DEFAULT nextval('public.tags_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: boomtown
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: items; Type: TABLE DATA; Schema: public; Owner: boomtown
--

COPY public.items (id, title, imageurl, description, ownerid, borrowerid, created) FROM stdin;
5	Catnip Buds	https://s7d2.scene7.com/is/image/PetSmart/5288036?1&wid=500&hei=270&fmt=jpg	Trimmed catnip buds.	5	\N	2019-01-25 10:20:02.711483-08
3	Catnip Cigar Cat Toy	https://s7d2.scene7.com/is/image/PetSmart/5288043?1&wid=500&hei=270&fmt=jpg	Toy filled with Meowijuana catnip.	1	\N	2019-01-08 16:03:01.298337-08
1	Kalico Kush Catnip	https://s7d2.scene7.com/is/image/PetSmart/5288038?1&wid=500&hei=270&fmt=jpg	Catnip with valerian root.	3	\N	2019-01-08 16:03:01.298337-08
0	Mice Dreams Catnip	https://s7d2.scene7.com/is/image/PetSmart/5288041?1&wid=500&hei=270&fmt=jpg	Catnip with passion flower and lavender.	1	\N	2019-01-08 16:03:01.298337-08
6	Purple Passion Catnip	https://s7d2.scene7.com/is/image/PetSmart/5288037?1&wid=500&hei=270&fmt=jpg	Catnip with silvervine.	1	\N	2019-01-26 20:24:20.146213-08
2	Whisker Tickler Catnip	https://s7d2.scene7.com/is/image/PetSmart/5288040?1&wid=500&hei=270&fmt=jpg	Catnip with chamomile.	2	\N	2019-01-08 16:03:01.298337-08
4	Catnip Oil Spray	https://s7d2.scene7.com/is/image/PetSmart/5288042?1&wid=500&hei=270&fmt=jpg	Catnip oil.	1	\N	2019-01-08 16:03:01.298337-08
\.


--
-- Data for Name: itemtags; Type: TABLE DATA; Schema: public; Owner: boomtown
--

COPY public.itemtags (itemid, tagid) FROM stdin;
2	6
1	1
2	1
1	6
3	1
3	6
4	1
4	6
0	1
0	6
5	1
5	6
6	1
6	6
\.


--
-- Data for Name: tags; Type: TABLE DATA; Schema: public; Owner: boomtown
--

COPY public.tags (id, name) FROM stdin;
0	tools
1	household items
2	physical media
3	electronics
4	sporting goods
5	musical instruments
6	recreational equipment
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: boomtown
--

COPY public.users (id, name, email, password, bio) FROM stdin;
60	sid	sid@name.com	$2a$10$MI2LR/R4kxY5WEl3uKOYYu4FjwEKsq5pDi/ZK./N5Hg49hYBVT81C	No bio provided.
61	Alex	alex@great.com	$2a$10$daUKkBwdXP6uFFEkrYEeRe5ctg2zft5a2rGS2mA7U6xqhHa27azeO	No bio provided.
2	Lil Bubz	bubz@cats.com	kitty	Magical Space Cat
1	Nala	nala@cats.com	kitty	Siamese/Tabby Cat
3	Coffee	coffee@cats.com	kitty	White Coffee Cat
4	Luhu	luhu@cats.com	kitty	Sad Cat
5	Hamilton	hamilton@cats.com	kitty	Hipster Cat
46	Alex Great	Alex@great.com	$2a$10$8wYcuEhU5wLM/sSj4JLq0.s88NizdodG2EfCMlqPkjfXS5tHrsBpa	No bio provided.
\.


--
-- Name: items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: boomtown
--

SELECT pg_catalog.setval('public.items_id_seq', 45, true);


--
-- Name: tags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: boomtown
--

SELECT pg_catalog.setval('public.tags_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: boomtown
--

SELECT pg_catalog.setval('public.users_id_seq', 92, true);


--
-- Name: items items_pkey; Type: CONSTRAINT; Schema: public; Owner: boomtown
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id);


--
-- Name: tags tags_name_key; Type: CONSTRAINT; Schema: public; Owner: boomtown
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_name_key UNIQUE (name);


--
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: public; Owner: boomtown
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);


--
-- Name: users users_ email_key; Type: CONSTRAINT; Schema: public; Owner: boomtown
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "users_
email_key" UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: boomtown
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: items items_ownerid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: boomtown
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_ownerid_fkey FOREIGN KEY (ownerid) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: itemtags itemtags_itemid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: boomtown
--

ALTER TABLE ONLY public.itemtags
    ADD CONSTRAINT itemtags_itemid_fkey FOREIGN KEY (itemid) REFERENCES public.items(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: itemtags itemtags_tagid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: boomtown
--

ALTER TABLE ONLY public.itemtags
    ADD CONSTRAINT itemtags_tagid_fkey FOREIGN KEY (tagid) REFERENCES public.tags(id) ON UPDATE CASCADE;


--
-- PostgreSQL database dump complete
--

