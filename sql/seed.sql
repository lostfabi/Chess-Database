-- Seed data for user: 1c8c28dc-3e4b-46b3-95e2-5bf26f5c8f81
-- Run this in the Supabase SQL editor

DO $$
DECLARE
    uid UUID := '1c8c28dc-3e4b-46b3-95e2-5bf26f5c8f81';
    t1   UUID;
    t2   UUID;
    t3   UUID;
BEGIN

-- ─── Tournaments ─────────────────────────────────────────────────────────────

INSERT INTO "Tournament" (name, "startDate", "endDate", score, "userId")
VALUES ('City Open 2024', '2024-03-01', '2024-03-03', 4, uid)
RETURNING id INTO t1;

INSERT INTO "Tournament" (name, "startDate", "endDate", score, "userId")
VALUES ('Club Championship 2024', '2024-06-10', '2024-06-16', 6, uid)
RETURNING id INTO t2;

INSERT INTO "Tournament" (name, "startDate", "endDate", score, "userId")
VALUES ('Summer Blitz 2025', '2025-07-20', '2025-07-20', 0, uid)
RETURNING id INTO t3;

-- ─── Games – City Open 2024 ───────────────────────────────────────────────────

INSERT INTO "Game" ("userId", "tournamentId", "playerWhite", "playerBlack", result, date, pgn)
VALUES (uid, t1, 'Fabian', 'Meyer, T.', '1-0', '2024-03-01',
'[White "Fabian"][Black "Meyer, T."][Result "1-0"]
1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 d6
8. c3 O-O 9. h3 Nb8 10. d4 Nbd7 11. Nbd2 Bb7 12. Bc2 Re8 13. Nf1 Bf8
14. Ng3 g6 15. b3 Bg7 16. d5 c6 17. dxc6 Bxc6 18. Nf5 Rc8 19. Bg5 h6
20. Bh4 g5 21. Nxg5 hxg5 22. Bxg5 Nf8 23. Qd3 Ng6 24. Bxf6 Bxf6
25. Qxg6+ fxg6 26. Nxh6+ Kf8 27. Nxf7 1-0');

INSERT INTO "Game" ("userId", "tournamentId", "playerWhite", "playerBlack", result, date, pgn)
VALUES (uid, t1, 'Schulz, P.', 'Fabian', '0-1', '2024-03-01',
'[White "Schulz, P."][Black "Fabian"][Result "0-1"]
1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Nf3 O-O 6. Be2 e5 7. O-O Nc6
8. d5 Ne7 9. Ne1 Nd7 10. Nd3 f5 11. Bd2 Nf6 12. f3 f4 13. c5 g5 14. cxd6
cxd6 15. Nb5 Ne8 16. Rc1 Rf6 17. Bb4 Rh6 18. Kh1 g4 19. fxg4 Rxh2+
20. Kxh2 Ng6 21. Nf2 Nxb4 22. Rc8 Qxc8 23. Qxc8 Rxc8 24. Nxd6 Rc2
25. Nxe8 Rxe2 26. Nf6+ Kf7 27. Nxg4 Rxb2 0-1');

INSERT INTO "Game" ("userId", "tournamentId", "playerWhite", "playerBlack", result, date, pgn)
VALUES (uid, t1, 'Fabian', 'Richter, A.', '1/2-1/2', '2024-03-02',
'[White "Fabian"][Black "Richter, A."][Result "1/2-1/2"]
1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Be3 e6 7. f3 b5
8. Qd2 Nbd7 9. g4 Nb6 10. g5 Nfd7 11. O-O-O Bb7 12. h4 Rc8 13. Kb1 d5
14. exd5 Nxd5 15. Nxd5 Bxd5 16. Be2 Qc7 17. Nf5 Qe5 18. Nd6+ Bxd6
19. Qxd6 Qxd6 20. Rxd6 O-O 21. Rhd1 Be4 22. fxe4 Rxc2 23. Bd3 Rc3
24. Bxh7+ Kxh7 25. Rxd7 Kg6 26. Rxf7 Rxe3 27. Rxf8 Rxf8 28. Rxf8 1/2-1/2');

INSERT INTO "Game" ("userId", "tournamentId", "playerWhite", "playerBlack", result, date, pgn)
VALUES (uid, t1, 'Wagner, K.', 'Fabian', '0-1', '2024-03-02',
'[White "Wagner, K."][Black "Fabian"][Result "0-1"]
1. Nf3 d5 2. g3 Nf6 3. Bg2 e6 4. O-O Be7 5. d3 O-O 6. Nbd2 c5 7. e4 Nc6
8. Re1 d4 9. Nc4 Qc7 10. a4 Nd7 11. Bd2 b6 12. Qe2 Bb7 13. h4 Rae8
14. Nh2 e5 15. f4 exf4 16. gxf4 Nf6 17. e5 Nd5 18. Nf3 f6 19. exf6 Rxf6
20. Bf1 Nxf4 21. Bxf4 Rxf4 22. Ne5 Nxe5 23. Rxe5 Ref8 24. Rae1 R4f6
25. R5e2 Qd6 26. Be2 Bd8 27. Qd1 Bc7 28. Qe1 Rg6 29. Kh2 Rxg2+ 0-1');

-- ─── Games – Club Championship 2024 ─────────────────────────────────────────

INSERT INTO "Game" ("userId", "tournamentId", "playerWhite", "playerBlack", result, date, pgn)
VALUES (uid, t2, 'Fabian', 'Becker, M.', '1-0', '2024-06-10',
'[White "Fabian"][Black "Becker, M."][Result "1-0"]
1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O 6. Nf3 h6 7. Bh4 b6
8. Be2 Bb7 9. O-O Nbd7 10. Rc1 c5 11. cxd5 Nxd5 12. Bxe7 Qxe7 13. Nxd5
Bxd5 14. dxc5 Nxc5 15. Nd4 Bc6 16. Nxc6 Qxc6 17. Bf3 Qe4 18. Bxe4 Nxe4
19. Qd4 Nxf2 20. Rxf2 Rfd8 21. Qb4 b5 22. a4 a6 23. axb5 axb5 24. Qxb5
Rdb8 25. Qe2 Rxb2 26. Rxb2 Rxb2 27. Qc4 Re2 28. Rd1 Rxe3 29. Rd8+ Kh7
30. Qf7 Re1+ 31. Kf2 Re2+ 32. Kg3 1-0');

INSERT INTO "Game" ("userId", "tournamentId", "playerWhite", "playerBlack", result, date, pgn)
VALUES (uid, t2, 'Hoffmann, S.', 'Fabian', '1/2-1/2', '2024-06-11',
'[White "Hoffmann, S."][Black "Fabian"][Result "1/2-1/2"]
1. e4 e5 2. Nf3 Nf6 3. Nxe5 d6 4. Nf3 Nxe4 5. d4 d5 6. Bd3 Nc6 7. O-O Be7
8. c4 Nb4 9. Be2 O-O 10. a3 Nc6 11. cxd5 Qxd5 12. Nc3 Nxc3 13. bxc3 Bg4
14. Be3 Rfe8 15. h3 Bh5 16. Nd2 Na5 17. Nb3 Nxb3 18. Qxb3 Qxb3 19. axb3
Bg6 20. Rfd1 Bd6 21. Ba6 bxa6 22. Rxa6 Reb8 23. Rda1 Rxb3 24. Rxa7 Rxa7
25. Rxa7 Rxc3 26. Ra2 c5 27. dxc5 Bxc5 28. Bxc5 Rxc5 1/2-1/2');

INSERT INTO "Game" ("userId", "tournamentId", "playerWhite", "playerBlack", result, date, pgn)
VALUES (uid, t2, 'Fabian', 'Klein, J.', '1-0', '2024-06-13',
'[White "Fabian"][Black "Klein, J."][Result "1-0"]
1. e4 c6 2. d4 d5 3. Nc3 dxe4 4. Nxe4 Bf5 5. Ng3 Bg6 6. h4 h6 7. Nf3 Nd7
8. h5 Bh7 9. Bd3 Bxd3 10. Qxd3 e6 11. Bf4 Ngf6 12. O-O-O Be7 13. Kb1 O-O
14. Ne4 Nxe4 15. Qxe4 Nf6 16. Qe2 Qa5 17. Ne5 Rad8 18. Rd3 c5 19. g4 c4
20. Rd1 Nd5 21. Bg3 Bf6 22. Nxc4 Qa4 23. Nd6 Qxa2+ 24. Kc1 Qa1+ 25. Kd2
Nf4 26. Qe4 Nxd3 27. cxd3 Qa5+ 28. Ke2 Qb4 29. Nxf7 Rxf7 30. Qxb4 1-0');

INSERT INTO "Game" ("userId", "tournamentId", "playerWhite", "playerBlack", result, date, pgn)
VALUES (uid, t2, 'Fabian', 'Braun, L.', '1-0', '2024-06-14',
'[White "Fabian"][Black "Braun, L."][Result "1-0"]
1. c4 Nf6 2. Nc3 e6 3. e4 d5 4. e5 d4 5. exf6 dxc3 6. bxc3 Qxf6 7. d4 e5
8. Nf3 exd4 9. cxd4 Bb4+ 10. Bd2 Bxd2+ 11. Qxd2 O-O 12. Be2 Nc6 13. O-O
Re8 14. d5 Na5 15. Nd4 Qe5 16. Bf3 c6 17. Rae1 Qd6 18. dxc6 bxc6 19. Nxc6
Nxc6 20. Rxe8+ Rxe8 21. Qd5 Qe7 22. Rd1 Ne5 23. Bg2 Bb7 24. Qxb7 Qxb7
25. Bxb7 Rb8 26. Bf3 Nxf3+ 27. gxf3 Rxb2 28. Rd7 Kf8 29. Rxa7 1-0');

INSERT INTO "Game" ("userId", "tournamentId", "playerWhite", "playerBlack", result, date, pgn)
VALUES (uid, t2, 'Krause, F.', 'Fabian', '0-1', '2024-06-15',
'[White "Krause, F."][Black "Fabian"][Result "0-1"]
1. d4 Nf6 2. Nf3 e6 3. e3 b6 4. Bd3 Bb7 5. O-O c5 6. c3 Be7 7. Nbd2 O-O
8. e4 cxd4 9. cxd4 d5 10. e5 Nfd7 11. Nf1 Nc6 12. Ng3 Nb4 13. Bb1 f6
14. exf6 Bxf6 15. a3 Nc6 16. b4 Nde5 17. Nxe5 Bxe5 18. Bb2 Bxg3 19. hxg3
Qg5 20. Qd2 Rxf2 21. Rxf2 Rf8 22. Raf1 Rxf2 23. Rxf2 Nxd4 24. Bxd4 Qxd2
25. Bxd2 Bxb2 26. Bc2 d4 27. Rf7 d3 28. Bxd3 Bxa3 29. Bc3 Bc1 0-1');

-- ─── Games – Summer Blitz 2025 (upcoming) ────────────────────────────────────

INSERT INTO "Game" ("userId", "tournamentId", "playerWhite", "playerBlack", result, date, pgn)
VALUES (uid, t3, 'Fabian', 'Fischer, R.', '1-0', '2025-07-20',
'[White "Fabian"][Black "Fischer, R."][Result "1-0"]
1. e4 e5 2. Bc4 Nf6 3. d3 Bc5 4. Nf3 d6 5. c3 Bb6 6. O-O O-O 7. Re1 c6
8. Bb3 Re8 9. h3 Nbd7 10. Nbd2 Nf8 11. Nf1 Ng6 12. Ng3 d5 13. exd5 cxd5
14. d4 exd4 15. cxd4 Bd7 16. Re5 Nf4 17. Bxf4 Rxe5 18. dxe5 Ng4 19. Bxd5
Nxf2 20. Kxf2 Qh4+ 21. Ke3 Bxh3 22. Bf3 Bxg2 23. Nh5 Bxf3 24. Kxf3 g6
25. Ng3 Re8 26. Nf5 gxf5 27. Qd5 Qh3 28. Qxf7+ Kh8 29. e6 1-0');

END $$;
