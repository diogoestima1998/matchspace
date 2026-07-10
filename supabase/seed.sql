-- Matchspace Music — seed data
-- 10 instruments, 8 published teachers (all can log in with password: MatchspaceDemo1!)

insert into public.instruments (name, slug) values
  ('Piano', 'piano'),
  ('Guitar', 'guitar'),
  ('Violin', 'violin'),
  ('Voice', 'voice'),
  ('Cello', 'cello'),
  ('Drums', 'drums'),
  ('Flute', 'flute'),
  ('Saxophone', 'saxophone'),
  ('Clarinet', 'clarinet'),
  ('Trumpet', 'trumpet'),
  ('Ukulele', 'ukulele'),
  ('Bass', 'bass'),
  ('Viola', 'viola'),
  ('Accordion', 'accordion');

-- seeded auth users so the demo teachers can actually log in
create extension if not exists pgcrypto;

with seed_users (id, email) as (
  values
    ('a1000000-0000-4000-8000-000000000001'::uuid, 'anna.keller@example.com'),
    ('a1000000-0000-4000-8000-000000000002'::uuid, 'luca.bernasconi@example.com'),
    ('a1000000-0000-4000-8000-000000000003'::uuid, 'elodie.favre@example.com'),
    ('a1000000-0000-4000-8000-000000000004'::uuid, 'jonas.widmer@example.com'),
    ('a1000000-0000-4000-8000-000000000005'::uuid, 'sofia.meier@example.com'),
    ('a1000000-0000-4000-8000-000000000006'::uuid, 'matteo.rossi@example.com'),
    ('a1000000-0000-4000-8000-000000000007'::uuid, 'celine.dubois@example.com'),
    ('a1000000-0000-4000-8000-000000000008'::uuid, 'david.brunner@example.com')
)
insert into auth.users (
  instance_id, id, aud, role, email, encrypted_password,
  email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
  created_at, updated_at, confirmation_token, recovery_token,
  email_change, email_change_token_new
)
select
  '00000000-0000-0000-0000-000000000000', id, 'authenticated', 'authenticated',
  email, crypt('MatchspaceDemo1!', gen_salt('bf')),
  now(), '{"provider":"email","providers":["email"]}'::jsonb, '{}'::jsonb,
  now(), now(), '', '', '', ''
from seed_users;

insert into auth.identities (
  id, user_id, provider_id, provider, identity_data,
  last_sign_in_at, created_at, updated_at
)
select
  gen_random_uuid(), u.id, u.id::text, 'email',
  jsonb_build_object('sub', u.id::text, 'email', u.email, 'email_verified', true),
  now(), now(), now()
from auth.users u
where u.email like '%@example.com';

insert into public.teachers
  (id, slug, full_name, bio, credentials, teaching_mode, location,
   hourly_price_chf, availability_note, avatar_url, rating, review_count, is_published)
values
  ('a1000000-0000-4000-8000-000000000001', 'anna-keller', 'Anna Keller',
   'I believe the piano should feel like a conversation, not an exam. My students range from six-year-olds discovering middle C to adults returning after twenty years away from the keys. We work on technique through repertoire you actually want to play — from Bach to Ludovico Einaudi.',
   'Master of Arts in Music Pedagogy, Zürcher Hochschule der Künste. 12 years of teaching experience, former répétiteur at Opernhaus Zürich.',
   'both', 'Zürich', 95,
   'Weekdays 14:00–19:00, Saturday mornings', '/teachers/anna-keller-3.jpg', 4.9, 127, true),

  ('a1000000-0000-4000-8000-000000000002', 'luca-bernasconi', 'Luca Bernasconi',
   'From flamenco to fingerstyle, I teach guitar as a language. Expect a relaxed studio, a lot of playing from day one, and a practice plan that fits around your life. Electric or acoustic — bring whatever you have.',
   'Diploma in Jazz Performance, Scuola universitaria di Musica, Lugano. Session guitarist with 15 years of stage experience across Europe.',
   'both', 'Lugano', 70,
   'Tuesday–Friday afternoons and evenings', '/teachers/luca-bernasconi-2.jpg', 4.8, 89, true),

  ('a1000000-0000-4000-8000-000000000003', 'elodie-favre', 'Élodie Favre',
   'Violin is my first language — I grew up between orchestral pits and chamber rehearsals. I teach with patience and precision: posture and sound first, speed later. Preparing students for auditions and exams is my specialty.',
   'Premier Prix, Conservatoire de Lausanne. Member of the Orchestre de Chambre de Lausanne; guest teacher at summer academies in Verbier.',
   'in_person', 'Lausanne', 85,
   'Monday, Wednesday and Thursday after 16:00', '/teachers/elodie-favre-3.jpg', 5.0, 64, true),

  ('a1000000-0000-4000-8000-000000000004', 'jonas-widmer', 'Jonas Widmer',
   'Groove before chops. I teach drums with a focus on time, feel and musicality — the things that get you asked back to a band. Beginners welcome; my studio has a full acoustic kit and an e-kit for quiet practice.',
   'Bachelor of Music, Jazzcampus Basel. Touring drummer for several Swiss indie acts; 8 years of private teaching.',
   'in_person', 'Basel', 60,
   'Weekday evenings, flexible on weekends', '/teachers/jonas-widmer-3.jpg', 4.7, 41, true),

  ('a1000000-0000-4000-8000-000000000005', 'sofia-meier', 'Sofia Meier',
   'Your voice is already there — my job is to help you trust it. I coach classical technique, musical theatre and pop, always built on healthy breath work. Online lessons work beautifully for voice, and most of my students mix formats.',
   'Master in Vocal Performance, Hochschule der Künste Bern. Soloist appearances with Berner Symphonieorchester; certified Complete Vocal Technique teacher.',
   'both', 'Bern', 80,
   'Tuesday–Saturday, mornings preferred for beginners', '/teachers/sofia-meier-3.jpg', 4.9, 103, true),

  ('a1000000-0000-4000-8000-000000000006', 'matteo-rossi', 'Matteo Rossi',
   'The cello sings closest to the human voice, and that is where we start: making one beautiful note. I teach all levels, with a soft spot for adult beginners who always wanted to try. Loan instruments available for the first months.',
   'Soloist diploma, Conservatorio della Svizzera italiana. Principal cellist experience with chamber ensembles in Zürich and Milan.',
   'in_person', 'Zürich', 90,
   'Wednesday–Friday 13:00–20:00', '/teachers/matteo-rossi-2.jpg', 4.8, 57, true),

  ('a1000000-0000-4000-8000-000000000007', 'celine-dubois', 'Céline Dubois',
   'Flute lessons that balance tone, technique and joy. Whether you are preparing a conservatoire audition or picking the instrument up for pleasure, we will build a warm, reliable sound and the confidence to perform.',
   'Master of Arts in Music Performance, Haute École de Musique de Genève. Regular substitute with the Orchestre de la Suisse Romande.',
   'both', 'Geneva', 75,
   'Monday–Thursday, plus online slots on Sundays', '/teachers/celine-dubois-3.jpg', 4.9, 72, true),

  ('a1000000-0000-4000-8000-000000000008', 'david-brunner', 'David Brunner',
   'Saxophone, clarinet and trumpet — I am a wind-band kid who never stopped. I teach jazz improvisation, classical fundamentals and everything between, fully online with two-camera setup so you see fingerings and embouchure clearly.',
   'Bachelor in Jazz Saxophone, Hochschule Luzern — Musik. Lead alto in the Swiss Jazz Orchestra youth programme; 10 years of online teaching.',
   'online', null, 45,
   'Evenings and weekends, fully online', '/teachers/david-brunner-2.jpg', 4.6, 38, true);

insert into public.teacher_instruments (teacher_id, instrument_id)
select t.teacher_id, i.id
from (
  values
    ('a1000000-0000-4000-8000-000000000001'::uuid, 'piano'),
    ('a1000000-0000-4000-8000-000000000002'::uuid, 'guitar'),
    ('a1000000-0000-4000-8000-000000000003'::uuid, 'violin'),
    ('a1000000-0000-4000-8000-000000000004'::uuid, 'drums'),
    ('a1000000-0000-4000-8000-000000000005'::uuid, 'voice'),
    ('a1000000-0000-4000-8000-000000000005'::uuid, 'piano'),
    ('a1000000-0000-4000-8000-000000000006'::uuid, 'cello'),
    ('a1000000-0000-4000-8000-000000000007'::uuid, 'flute'),
    ('a1000000-0000-4000-8000-000000000008'::uuid, 'saxophone'),
    ('a1000000-0000-4000-8000-000000000008'::uuid, 'clarinet'),
    ('a1000000-0000-4000-8000-000000000008'::uuid, 'trumpet')
) as t (teacher_id, slug)
join public.instruments i on i.slug = t.slug;
-- Adds 6 more seeded teachers (same demo password: MatchspaceDemo1!)

with seed_users (id, email) as (
  values
    ('a1000000-0000-4000-8000-000000000009'::uuid, 'nina.baumann@example.com'),
    ('a1000000-0000-4000-8000-000000000010'::uuid, 'marc.hofstetter@example.com'),
    ('a1000000-0000-4000-8000-000000000011'::uuid, 'rafael.costa@example.com'),
    ('a1000000-0000-4000-8000-000000000012'::uuid, 'leonie.graf@example.com'),
    ('a1000000-0000-4000-8000-000000000013'::uuid, 'tobias.frey@example.com'),
    ('a1000000-0000-4000-8000-000000000014'::uuid, 'camille.rochat@example.com')
)
insert into auth.users (
  instance_id, id, aud, role, email, encrypted_password,
  email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
  created_at, updated_at, confirmation_token, recovery_token,
  email_change, email_change_token_new
)
select
  '00000000-0000-0000-0000-000000000000', id, 'authenticated', 'authenticated',
  email, crypt('MatchspaceDemo1!', gen_salt('bf')),
  now(), '{"provider":"email","providers":["email"]}'::jsonb, '{}'::jsonb,
  now(), now(), '', '', '', ''
from seed_users;

insert into auth.identities (
  id, user_id, provider_id, provider, identity_data,
  last_sign_in_at, created_at, updated_at
)
select
  gen_random_uuid(), u.id, u.id::text, 'email',
  jsonb_build_object('sub', u.id::text, 'email', u.email, 'email_verified', true),
  now(), now(), now()
from auth.users u
where u.id in (
  'a1000000-0000-4000-8000-000000000009', 'a1000000-0000-4000-8000-000000000010',
  'a1000000-0000-4000-8000-000000000011', 'a1000000-0000-4000-8000-000000000012',
  'a1000000-0000-4000-8000-000000000013', 'a1000000-0000-4000-8000-000000000014'
);

insert into public.teachers
  (id, slug, full_name, bio, credentials, teaching_mode, location,
   hourly_price_chf, availability_note, avatar_url, rating, review_count, is_published)
values
  ('a1000000-0000-4000-8000-000000000009', 'nina-baumann', 'Nina Baumann',
   'Piano without pressure. I work a lot with adult beginners and returners — people who want music back in their week. Expect patient technique work, pop and film repertoire alongside the classics, and small wins every single lesson.',
   'Bachelor of Music, Zürcher Hochschule der Künste. Certified in adult music pedagogy; five years at Musikschule Winterthur.',
   'both', 'Winterthur', 75,
   'Weekday mornings and Thursday evenings', '/teachers/nina-baumann.jpg', 4.7, 23, true),

  ('a1000000-0000-4000-8000-000000000010', 'marc-hofstetter', 'Marc Hofstetter',
   'Thirty years in brass bands and orchestras taught me one thing: sound comes from relaxation, not force. I coach trumpet players from first buzz to conservatory entrance, with a soft spot for wind band musicians.',
   'Solo trumpet, Luzerner Sinfonieorchester (former). Instructor for the Swiss youth brass band championship programme.',
   'in_person', 'Luzern', 65,
   'Tuesday and Thursday afternoons, Saturday mornings', '/teachers/marc-hofstetter.jpg', 4.8, 94, true),

  ('a1000000-0000-4000-8000-000000000011', 'rafael-costa', 'Rafael Costa',
   'Rock, blues, funk and everything with distortion. We build your technique through the songs you actually listen to — riffs first, theory when it helps. Bring your own guitar or plug into my studio rig.',
   'Berklee Online guitar certificate; 15 years of session and touring work across Europe. Endorsed clinician for two amp brands.',
   'both', 'Zürich', 85,
   'Weekday evenings, online slots on Wednesdays', '/teachers/rafael-costa.jpg', 4.9, 61, true),

  ('a1000000-0000-4000-8000-000000000012', 'leonie-graf', 'Leonie Graf',
   'The clarinet rewards patience and good habits early. I teach a calm, structured method: breath, embouchure, then musicality — with duets in every lesson because playing together is the point.',
   'Master of Arts in Music Pedagogy, Hochschule für Musik Basel. Second clarinet with a regional symphony; 10 years of teaching.',
   'both', 'Basel', 70,
   'Monday–Wednesday after 15:00', '/teachers/leonie-graf.jpg', 4.8, 47, true),

  ('a1000000-0000-4000-8000-000000000013', 'tobias-frey', 'Tobias Frey',
   'From shower singer to stage-ready. I coach contemporary and classical voice, choir audition prep and healthy belting — always grounded in anatomy, never in mystery. First lesson is a friendly voice diagnosis.',
   'Master in Vocal Pedagogy, Hochschule der Künste Bern. Choir director of two Zürich ensembles; certified Estill Voice practitioner.',
   'both', 'Zürich', 90,
   'Wednesday–Friday, some Saturday slots', '/teachers/tobias-frey.jpg', 4.9, 85, true),

  ('a1000000-0000-4000-8000-000000000014', 'camille-rochat', 'Camille Rochat',
   'I trained in the French school of violin: singing tone, effortless bow arm, honest fundamentals. My students win places in youth orchestras — but more importantly, they keep playing for life.',
   'Premier Prix, Conservatoire de Genève. Twenty years of orchestral and chamber experience; jury member at regional competitions.',
   'in_person', 'Geneva', 95,
   'Monday, Tuesday and Friday afternoons', '/teachers/camille-rochat.jpg', 5.0, 112, true);

insert into public.teacher_instruments (teacher_id, instrument_id)
select t.teacher_id, i.id
from (
  values
    ('a1000000-0000-4000-8000-000000000009'::uuid, 'piano'),
    ('a1000000-0000-4000-8000-000000000010'::uuid, 'trumpet'),
    ('a1000000-0000-4000-8000-000000000011'::uuid, 'guitar'),
    ('a1000000-0000-4000-8000-000000000012'::uuid, 'clarinet'),
    ('a1000000-0000-4000-8000-000000000013'::uuid, 'voice'),
    ('a1000000-0000-4000-8000-000000000014'::uuid, 'violin')
) as t (teacher_id, slug)
join public.instruments i on i.slug = t.slug;
-- Adds 15 more seeded teachers (same demo password: MatchspaceDemo1!)

with seed_users (id, email) as (
  values
    ('a1000000-0000-4000-8000-000000000015'::uuid, 'petra.schneider@example.com'),
    ('a1000000-0000-4000-8000-000000000016'::uuid, 'diego.martins@example.com'),
    ('a1000000-0000-4000-8000-000000000017'::uuid, 'hana.yoshida@example.com'),
    ('a1000000-0000-4000-8000-000000000018'::uuid, 'stefan.wyss@example.com'),
    ('a1000000-0000-4000-8000-000000000019'::uuid, 'ana.petrovic@example.com'),
    ('a1000000-0000-4000-8000-000000000020'::uuid, 'oliver.kunz@example.com'),
    ('a1000000-0000-4000-8000-000000000021'::uuid, 'mireille.bovet@example.com'),
    ('a1000000-0000-4000-8000-000000000022'::uuid, 'samuel.ackermann@example.com'),
    ('a1000000-0000-4000-8000-000000000023'::uuid, 'julia.steiner@example.com'),
    ('a1000000-0000-4000-8000-000000000024'::uuid, 'pedro.alves@example.com'),
    ('a1000000-0000-4000-8000-000000000025'::uuid, 'franziska.huber@example.com'),
    ('a1000000-0000-4000-8000-000000000026'::uuid, 'marko.novak@example.com'),
    ('a1000000-0000-4000-8000-000000000027'::uuid, 'ingrid.aebischer@example.com'),
    ('a1000000-0000-4000-8000-000000000028'::uuid, 'lucas.perrin@example.com'),
    ('a1000000-0000-4000-8000-000000000029'::uuid, 'selin.demir@example.com')
)
insert into auth.users (
  instance_id, id, aud, role, email, encrypted_password,
  email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
  created_at, updated_at, confirmation_token, recovery_token,
  email_change, email_change_token_new
)
select
  '00000000-0000-0000-0000-000000000000', id, 'authenticated', 'authenticated',
  email, crypt('MatchspaceDemo1!', gen_salt('bf')),
  now(), '{"provider":"email","providers":["email"]}'::jsonb, '{}'::jsonb,
  now(), now(), '', '', '', ''
from seed_users;

insert into auth.identities (
  id, user_id, provider_id, provider, identity_data,
  last_sign_in_at, created_at, updated_at
)
select
  gen_random_uuid(), u.id, u.id::text, 'email',
  jsonb_build_object('sub', u.id::text, 'email', u.email, 'email_verified', true),
  now(), now(), now()
from auth.users u
where u.id between 'a1000000-0000-4000-8000-000000000015'
               and 'a1000000-0000-4000-8000-000000000029';

insert into public.teachers
  (id, slug, full_name, bio, credentials, teaching_mode, location,
   hourly_price_chf, availability_note, avatar_url, rating, review_count, is_published)
values
  ('a1000000-0000-4000-8000-000000000015', 'petra-schneider', 'Petra Schneider',
   'Cello is a lifelong conversation, and I have been having it for four decades. I teach a calm, structured technique built on beautiful tone, and I love preparing students for their first chamber music experiences.',
   'Soloist diploma, Hochschule der Künste Bern. Former member of the Berner Symphonieorchester; 25 years of teaching.',
   'both', 'Bern', 85,
   'Tuesday-Friday mornings and early afternoons', '/teachers/petra-schneider.jpg', 4.9, 76, true),

  ('a1000000-0000-4000-8000-000000000016', 'diego-martins', 'Diego Martins',
   'Samba, funk, rock, jazz - groove is groove. We start with time feel and dynamics, not rudiment lists. My studio has a full kit, a practice pad corner and neighbours who are used to it.',
   'Berklee-certified drum instructor; ten years touring with Brazilian and Swiss bands.',
   'both', 'Geneva', 70,
   'Weekday evenings and Saturday afternoons', '/teachers/diego-martins.jpg', 4.7, 33, true),

  ('a1000000-0000-4000-8000-000000000017', 'hana-yoshida', 'Hana Yoshida',
   'I trained in the Russian piano school and teach with its discipline - but lessons should end with music you love. Exam preparation (ABRSM, conservatory entrance) is my specialty; beginners with big goals are welcome.',
   'Concert diploma, Tokyo University of the Arts; postgraduate studies at Hochschule für Musik Basel. Prize winner at two international competitions.',
   'in_person', 'Basel', 100,
   'Monday-Thursday 13:00-19:00', '/teachers/hana-yoshida.jpg', 5.0, 141, true),

  ('a1000000-0000-4000-8000-000000000018', 'stefan-wyss', 'Stefan Wyss',
   'Classical and fingerstyle guitar taught with patience and good humour. I believe in slow practice, beautiful repertoire and never skipping the fundamentals. All ages - my oldest student is 74.',
   'Diploma in Classical Guitar, Konservatorium St. Gallen. 20 years of private and school teaching.',
   'both', 'St. Gallen', 60,
   'Wednesday-Saturday', '/teachers/stefan-wyss-2.jpg', 4.6, 52, true),

  ('a1000000-0000-4000-8000-000000000019', 'ana-petrovic', 'Ana Petrović',
   'Violin technique is a toolbox, not a religion. I mix the best of the Russian and Franco-Belgian schools and tailor everything to your hands. Serious students preparing auditions get a detailed practice plan every week.',
   'Master of Music, Universität der Künste Berlin. Concertmaster experience with two chamber orchestras; guest teacher at masterclasses across Europe.',
   'in_person', 'Zürich', 110,
   'Monday, Tuesday, Thursday afternoons', '/teachers/ana-petrovic.jpg', 4.9, 98, true),

  ('a1000000-0000-4000-8000-000000000020', 'oliver-kunz', 'Oliver Kunz',
   'Jazz saxophone from the first note: sound, phrasing, and the courage to improvise. We transcribe, we play along to records, and we get you ready for your first jam session. Classical fundamentals included.',
   'Master in Jazz Performance, Hochschule Luzern - Musik. 15 years on Swiss jazz stages; lecturer at workshop weeks.',
   'both', 'Bern', 75,
   'Tuesday-Friday evenings', '/teachers/oliver-kunz-2.jpg', 4.8, 66, true),

  ('a1000000-0000-4000-8000-000000000021', 'mireille-bovet', 'Mireille Bovet',
   'The voice is the only instrument you build yourself. I coach classical singers, choir members and complete beginners in healthy, effortless technique - in French, English or German.',
   'Premier Prix de Chant, Conservatoire de Lausanne. Twenty years of recital and oratorio work across Romandie.',
   'both', 'Lausanne', 80,
   'Monday-Thursday, some Saturday mornings', '/teachers/mireille-bovet-2.jpg', 4.9, 119, true),

  ('a1000000-0000-4000-8000-000000000022', 'samuel-ackermann', 'Samuel Ackermann',
   'Trumpet should feel easy - if it hurts, we fix the setup. Brass band tradition meets modern pedagogy: buzzing, breathing, and a lot of duets. Kids from 8, adults at any age.',
   'Bachelor of Music, Hochschule Luzern. Principal cornet in a national-league brass band; certified school music teacher.',
   'both', 'Zürich', 70,
   'Weekday afternoons and evenings', '/teachers/samuel-ackermann.jpg', 4.7, 29, true),

  ('a1000000-0000-4000-8000-000000000023', 'julia-steiner', 'Julia Steiner',
   'Fully online flute studio with a two-camera setup - you see embouchure and fingerings in detail. Structured curriculum, recorded feedback between lessons, and honest, kind coaching.',
   'Master of Arts in Music Pedagogy, Hochschule Luzern - Musik. Eight years of teaching, five of them online-first.',
   'online', null, 65,
   'Weekdays 9:00-18:00, flexible time zones', '/teachers/julia-steiner.jpg', 4.8, 44, true),

  ('a1000000-0000-4000-8000-000000000024', 'pedro-alves', 'Pedro Alves',
   'Chill, modern guitar lessons online: fingerstyle, pop covers, songwriting basics and home recording tips. Perfect for teens and busy adults who want to sound good fast - and enjoy the process.',
   'Self-built online studio with 40+ active students; certificate in modern guitar methods (MusicGurus).',
   'online', null, 55,
   'Evenings and weekends', '/teachers/pedro-alves.jpg', 4.5, 18, true),

  ('a1000000-0000-4000-8000-000000000025', 'franziska-huber', 'Franziska Huber',
   'Thirty years of clarinet teaching in schools and privately. Careful embouchure work, beautiful legato, and duets in every lesson. I also prepare students for wind band auditions and youth orchestra seats.',
   'Diploma in Clarinet, Musikhochschule Zürich. Long-standing member of a professional wind ensemble; school music teacher.',
   'in_person', 'Zug', 75,
   'Monday-Wednesday and Friday afternoons', '/teachers/franziska-huber.jpg', 4.9, 87, true),

  ('a1000000-0000-4000-8000-000000000026', 'marko-novak', 'Marko Novak',
   'Piano for the curious: classical technique, jazz voicings and improvisation side by side. I teach in Italian, German, English and Croatian - and I promise you will play real music in lesson one.',
   'Master in Piano Performance, Conservatorio della Svizzera italiana. Accompanist for choirs and soloists across Ticino.',
   'both', 'Lugano', 70,
   'Tuesday-Saturday', '/teachers/marko-novak-b.jpg', 4.8, 71, true),

  ('a1000000-0000-4000-8000-000000000027', 'ingrid-aebischer', 'Ingrid Aebischer',
   'I have taught violin for thirty-five years, and every student still teaches me something. Gentle, thorough foundations for children; honest technical rebuilding for adults who want to return to the instrument.',
   'Diploma, Conservatoire de Fribourg. Founder of a regional youth string academy; jury member at cantonal competitions.',
   'both', 'Fribourg', 80,
   'Monday-Friday mornings', '/teachers/ingrid-aebischer.jpg', 5.0, 156, true),

  ('a1000000-0000-4000-8000-000000000028', 'lucas-perrin', 'Lucas Perrin',
   'Young cellist, fresh out of the conservatory and full of ideas. Expect energy, contemporary repertoire alongside Bach, and a teacher who still remembers exactly how hard the first year feels.',
   'Master of Arts in Music Performance, Haute École de Musique de Genève, site de Neuchâtel. Freelance orchestral cellist.',
   'in_person', 'Neuchâtel', 75,
   'Wednesday-Saturday', '/teachers/lucas-perrin.jpg', 4.7, 26, true),

  ('a1000000-0000-4000-8000-000000000029', 'selin-demir', 'Selin Demir',
   'Pop, soul and musical theatre voice coaching with a healthy-technique backbone. We work on your songs, your mic technique and your confidence - the goal is you, sounding like you, but stronger.',
   'Bachelor in Contemporary Voice, ZHdK. Session and backing vocalist; certified vocal health first-aid trainer.',
   'both', 'Winterthur', 70,
   'Weekday evenings, Sunday afternoons', '/teachers/selin-demir.jpg', 4.8, 35, true);

insert into public.teacher_instruments (teacher_id, instrument_id)
select t.teacher_id, i.id
from (
  values
    ('a1000000-0000-4000-8000-000000000015'::uuid, 'cello'),
    ('a1000000-0000-4000-8000-000000000016'::uuid, 'drums'),
    ('a1000000-0000-4000-8000-000000000017'::uuid, 'piano'),
    ('a1000000-0000-4000-8000-000000000018'::uuid, 'guitar'),
    ('a1000000-0000-4000-8000-000000000019'::uuid, 'violin'),
    ('a1000000-0000-4000-8000-000000000020'::uuid, 'saxophone'),
    ('a1000000-0000-4000-8000-000000000020'::uuid, 'clarinet'),
    ('a1000000-0000-4000-8000-000000000021'::uuid, 'voice'),
    ('a1000000-0000-4000-8000-000000000022'::uuid, 'trumpet'),
    ('a1000000-0000-4000-8000-000000000023'::uuid, 'flute'),
    ('a1000000-0000-4000-8000-000000000024'::uuid, 'guitar'),
    ('a1000000-0000-4000-8000-000000000025'::uuid, 'clarinet'),
    ('a1000000-0000-4000-8000-000000000026'::uuid, 'piano'),
    ('a1000000-0000-4000-8000-000000000027'::uuid, 'violin'),
    ('a1000000-0000-4000-8000-000000000028'::uuid, 'cello'),
    ('a1000000-0000-4000-8000-000000000029'::uuid, 'voice'),
    ('a1000000-0000-4000-8000-000000000024'::uuid, 'ukulele'),
    ('a1000000-0000-4000-8000-000000000011'::uuid, 'bass'),
    ('a1000000-0000-4000-8000-000000000019'::uuid, 'viola'),
    ('a1000000-0000-4000-8000-000000000027'::uuid, 'viola'),
    ('a1000000-0000-4000-8000-000000000026'::uuid, 'accordion')
) as t (teacher_id, slug)
join public.instruments i on i.slug = t.slug;
