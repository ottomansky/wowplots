-- WoWPlots seed data: 25 builds, images, tags, and build_tags
-- Safe to re-run: uses INSERT OR IGNORE for tags

-- ============================================================
-- TAGS (15 tags across style/theme categories)
-- ============================================================
INSERT OR IGNORE INTO tags (id, name, category) VALUES ('tag_rustic_000000000', 'rustic', 'style');
INSERT OR IGNORE INTO tags (id, name, category) VALUES ('tag_elegant_00000000', 'elegant', 'style');
INSERT OR IGNORE INTO tags (id, name, category) VALUES ('tag_gothic_000000000', 'gothic', 'style');
INSERT OR IGNORE INTO tags (id, name, category) VALUES ('tag_nature_000000000', 'nature', 'style');
INSERT OR IGNORE INTO tags (id, name, category) VALUES ('tag_minimalist_00000', 'minimalist', 'style');
INSERT OR IGNORE INTO tags (id, name, category) VALUES ('tag_industrial_00000', 'industrial', 'style');
INSERT OR IGNORE INTO tags (id, name, category) VALUES ('tag_cozy_00000000000', 'cozy', 'style');
INSERT OR IGNORE INTO tags (id, name, category) VALUES ('tag_tavern_000000000', 'tavern', 'theme');
INSERT OR IGNORE INTO tags (id, name, category) VALUES ('tag_library_00000000', 'library', 'theme');
INSERT OR IGNORE INTO tags (id, name, category) VALUES ('tag_garden_000000000', 'garden', 'theme');
INSERT OR IGNORE INTO tags (id, name, category) VALUES ('tag_horde_0000000000', 'horde', 'faction');
INSERT OR IGNORE INTO tags (id, name, category) VALUES ('tag_alliance_0000000', 'alliance', 'faction');
INSERT OR IGNORE INTO tags (id, name, category) VALUES ('tag_holiday_00000000', 'holiday', 'theme');
INSERT OR IGNORE INTO tags (id, name, category) VALUES ('tag_themed_000000000', 'themed', 'theme');
INSERT OR IGNORE INTO tags (id, name, category) VALUES ('tag_workshop_0000000', 'workshop', 'theme');

-- ============================================================
-- BUILDS (25 builds across 6 biomes and 3 sizes)
-- ============================================================

-- 1. Enchanted Grove - Large
INSERT INTO builds (id, slug, title, description, biome, house_size, room_count, item_count, layout_code, status, view_count, like_count, created_at, updated_at) VALUES ('bld_enchanted_lib_01', 'enchanted-library', 'The Enchanted Library', 'A sprawling arcane library nestled deep within the Enchanted Grove. Every shelf is lined with glowing tomes and enchanted scrolls, while wisps of magical light drift between the aisles. The upper reading loft offers a stunning view of the grove canopy.', 'enchanted-grove', 'large', 5, 387, NULL, 'published', 45, 0, '2026-03-06T10:15:00Z', '2026-03-06T10:15:00Z');

-- 2. Sunlit Meadow - Small
INSERT INTO builds (id, slug, title, description, biome, house_size, room_count, item_count, layout_code, status, view_count, like_count, created_at, updated_at) VALUES ('bld_cozy_meadow_c_02', 'cozy-meadow-cottage', 'Cozy Meadow Cottage', 'A humble one-room cottage surrounded by wildflowers and golden sunlight. The interior features a crackling fireplace, a hand-knit rug, and a window seat perfect for watching the sunrise. Simple but deeply charming.', 'sunlit-meadow', 'small', 1, 64, NULL, 'published', 12, 0, '2026-03-07T08:30:00Z', '2026-03-07T08:30:00Z');

-- 3. Twilight Thicket - Medium
INSERT INTO builds (id, slug, title, description, biome, house_size, room_count, item_count, layout_code, status, view_count, like_count, created_at, updated_at) VALUES ('bld_shadow_apoth_03', 'shadow-apothecary', 'Shadow Apothecary', 'A moody two-room apothecary hidden in the Twilight Thicket, filled with bubbling cauldrons and shelves of mysterious reagents. The back room houses a private study where forbidden recipes are kept under lock and key.', 'twilight-thicket', 'medium', 2, 178, NULL, 'published', 6, 0, '2026-03-07T14:20:00Z', '2026-03-07T14:20:00Z');

-- 4. Crystal Cavern - Large
INSERT INTO builds (id, slug, title, description, biome, house_size, room_count, item_count, layout_code, status, view_count, like_count, created_at, updated_at) VALUES ('bld_crystal_thro_04', 'crystal-throne-room', 'Crystal Throne Room', 'A majestic throne room carved into the heart of an enormous crystal formation. Prismatic light refracts through towering crystal pillars, casting rainbows across polished marble floors. The throne itself is hewn from a single massive amethyst.', 'crystal-cavern', 'large', 6, 445, NULL, 'published', 22, 0, '2026-03-08T09:00:00Z', '2026-03-08T09:00:00Z');

-- 5. Volcanic Ridge - Small
INSERT INTO builds (id, slug, title, description, biome, house_size, room_count, item_count, layout_code, status, view_count, like_count, created_at, updated_at) VALUES ('bld_lava_forge_s_05', 'lava-forge-shack', 'Lava Forge Shack', 'A compact blacksmith shack perched on the edge of a volcanic vent, using natural lava flows to power the forge. Every tool hangs in its rightful place, and the anvil glows with residual heat. Built for function, not comfort.', 'volcanic-ridge', 'small', 1, 42, NULL, 'published', 20, 0, '2026-03-08T16:45:00Z', '2026-03-08T16:45:00Z');

-- 6. Coastal Bluff - Medium
INSERT INTO builds (id, slug, title, description, biome, house_size, room_count, item_count, layout_code, status, view_count, like_count, created_at, updated_at) VALUES ('bld_seaside_tavr_06', 'seaside-tavern', 'The Seaside Tavern', 'A lively two-story tavern overlooking the ocean from atop the coastal bluffs. Barrels of ale line the walls, lanterns swing from the rafters, and a bard stage sits in the corner. The upper deck has the best sunset view in Azeroth.', 'coastal-bluff', 'medium', 3, 231, NULL, 'published', 19, 0, '2026-03-09T11:30:00Z', '2026-03-09T11:30:00Z');

-- 7. Enchanted Grove - Medium
INSERT INTO builds (id, slug, title, description, biome, house_size, room_count, item_count, layout_code, status, view_count, like_count, created_at, updated_at) VALUES ('bld_druid_sanctu_07', 'druid-sanctuary', 'Druid Sanctuary', 'A tranquil two-room sanctuary woven from living wood and flowering vines. Moonwell water trickles through a small indoor stream, and bioluminescent mushrooms provide a soft ambient glow. A place of healing and reflection.', 'enchanted-grove', 'medium', 2, 156, NULL, 'published', 13, 0, '2026-03-09T19:00:00Z', '2026-03-09T19:00:00Z');

-- 8. Sunlit Meadow - Large
INSERT INTO builds (id, slug, title, description, biome, house_size, room_count, item_count, layout_code, status, view_count, like_count, created_at, updated_at) VALUES ('bld_harvest_home_08', 'harvest-homestead', 'Harvest Homestead', 'A sprawling farmstead with a fully furnished kitchen, dining hall, bedrooms, and a pantry stocked for a feast. Outside, crops sway in the breeze and a scarecrow keeps watch. This build captures the warmth of Westfall living.', 'sunlit-meadow', 'large', 5, 398, NULL, 'published', 11, 0, '2026-03-10T07:15:00Z', '2026-03-10T07:15:00Z');

-- 9. Twilight Thicket - Small
INSERT INTO builds (id, slug, title, description, biome, house_size, room_count, item_count, layout_code, status, view_count, like_count, created_at, updated_at) VALUES ('bld_witchs_hut_s_09', 'witchs-hut', 'Witch''s Hut', 'A cramped one-room hut draped in cobwebs and dried herbs. A single cauldron dominates the center, surrounded by scattered bones, candles, and arcane totems. Not for the faint of heart, but rich in atmosphere.', 'twilight-thicket', 'small', 1, 53, NULL, 'published', 48, 0, '2026-03-10T21:30:00Z', '2026-03-10T21:30:00Z');

-- 10. Crystal Cavern - Small
INSERT INTO builds (id, slug, title, description, biome, house_size, room_count, item_count, layout_code, status, view_count, like_count, created_at, updated_at) VALUES ('bld_gem_cutters__10', 'gem-cutters-nook', 'Gem Cutter''s Nook', 'A tiny but meticulously organized gem-cutting workshop carved into a crystal alcove. Every facet of every gem on display catches the cavern light just right. The workbench holds tools of incredible precision.', 'crystal-cavern', 'small', 1, 38, NULL, 'published', 39, 0, '2026-03-11T13:00:00Z', '2026-03-11T13:00:00Z');

-- 11. Volcanic Ridge - Medium
INSERT INTO builds (id, slug, title, description, biome, house_size, room_count, item_count, layout_code, status, view_count, like_count, created_at, updated_at) VALUES ('bld_war_room_vol_11', 'horde-war-room', 'Horde War Room', 'A fierce command center built from dark iron and volcanic stone. Battle maps cover the central table, Horde banners hang from every wall, and weapon racks line the corridors. Every detail screams For the Horde.', 'volcanic-ridge', 'medium', 3, 203, NULL, 'published', 10, 0, '2026-03-11T17:45:00Z', '2026-03-11T17:45:00Z');

-- 12. Coastal Bluff - Large
INSERT INTO builds (id, slug, title, description, biome, house_size, room_count, item_count, layout_code, status, view_count, like_count, created_at, updated_at) VALUES ('bld_lighthouse_k_12', 'lighthouse-keep', 'Lighthouse Keep', 'A towering lighthouse converted into a full living quarters with a kitchen, sleeping chambers, study, and the iconic lamp room at the top. The spiral staircase is adorned with nautical memorabilia, and the view from the top is breathtaking.', 'coastal-bluff', 'large', 5, 356, NULL, 'published', 42, 0, '2026-03-12T06:00:00Z', '2026-03-12T06:00:00Z');

-- 13. Enchanted Grove - Small
INSERT INTO builds (id, slug, title, description, biome, house_size, room_count, item_count, layout_code, status, view_count, like_count, created_at, updated_at) VALUES ('bld_faerie_glen__13', 'faerie-glen-hideout', 'Faerie Glen Hideout', 'A whimsical single-room hideout nestled beneath a giant mushroom cap. Tiny lanterns dangle from roots overhead, and a hammock swings gently in the magical breeze. Everything is miniature-scaled and utterly delightful.', 'enchanted-grove', 'small', 1, 47, NULL, 'published', 32, 0, '2026-03-12T15:30:00Z', '2026-03-12T15:30:00Z');

-- 14. Sunlit Meadow - Medium
INSERT INTO builds (id, slug, title, description, biome, house_size, room_count, item_count, layout_code, status, view_count, like_count, created_at, updated_at) VALUES ('bld_alliance_out_14', 'alliance-outpost', 'Alliance Field Outpost', 'A proud Alliance outpost with a command room and barracks, flying the lion banner high. The armory is stocked, the beds are made with military precision, and a map of current operations dominates the main wall.', 'sunlit-meadow', 'medium', 2, 167, NULL, 'published', 7, 0, '2026-03-13T10:00:00Z', '2026-03-13T10:00:00Z');

-- 15. Twilight Thicket - Large
INSERT INTO builds (id, slug, title, description, biome, house_size, room_count, item_count, layout_code, status, view_count, like_count, created_at, updated_at) VALUES ('bld_necro_manor__15', 'necromancers-manor', 'Necromancer''s Manor', 'A sprawling gothic manor consumed by shadow and decay. Six rooms of dark grandeur include a summoning chamber, a crypt, a banquet hall with spectral guests, and a tower study. The chandelier alone uses 30 candles.', 'twilight-thicket', 'large', 6, 421, NULL, 'published', 6, 0, '2026-03-13T22:15:00Z', '2026-03-13T22:15:00Z');

-- 16. Crystal Cavern - Medium
INSERT INTO builds (id, slug, title, description, biome, house_size, room_count, item_count, layout_code, status, view_count, like_count, created_at, updated_at) VALUES ('bld_arcane_lab_c_16', 'arcane-laboratory', 'Arcane Laboratory', 'A two-room research lab where crystalline energy powers elaborate arcane machinery. Floating orbs orbit a central apparatus, and equations are scrawled across every available surface. Science and magic collide beautifully here.', 'crystal-cavern', 'medium', 2, 189, NULL, 'published', 10, 0, '2026-03-14T08:45:00Z', '2026-03-14T08:45:00Z');

-- 17. Volcanic Ridge - Large
INSERT INTO builds (id, slug, title, description, biome, house_size, room_count, item_count, layout_code, status, view_count, like_count, created_at, updated_at) VALUES ('bld_molten_forte_17', 'molten-fortress', 'Molten Fortress', 'A massive dark iron fortress built to withstand the volcanic heat. Four barracks, an armory, and a war council chamber make up this imposing stronghold. Lava channels run through the walls providing both light and intimidation.', 'volcanic-ridge', 'large', 5, 412, NULL, 'published', 18, 0, '2026-03-14T18:00:00Z', '2026-03-14T18:00:00Z');

-- 18. Coastal Bluff - Small
INSERT INTO builds (id, slug, title, description, biome, house_size, room_count, item_count, layout_code, status, view_count, like_count, created_at, updated_at) VALUES ('bld_fishers_shan_18', 'fishers-shanty', 'Fisher''s Shanty', 'A weathered one-room shanty perched over the water on wooden stilts. Fishing nets hang from the ceiling, a cook pot simmers with today''s catch, and a hammock faces the open sea. Simple saltwater living at its finest.', 'coastal-bluff', 'small', 1, 31, NULL, 'published', 19, 0, '2026-03-15T07:30:00Z', '2026-03-15T07:30:00Z');

-- 19. Enchanted Grove - Large
INSERT INTO builds (id, slug, title, description, biome, house_size, room_count, item_count, layout_code, status, view_count, like_count, created_at, updated_at) VALUES ('bld_moonwell_pal_19', 'moonwell-palace', 'Moonwell Palace', 'An elven palace built around a sacred moonwell at its center. Four wings radiate outward, each themed to a season: spring blossoms, summer canopy, autumn leaves, and winter frost. The craftsmanship is staggering.', 'enchanted-grove', 'large', 6, 448, NULL, 'published', 37, 0, '2026-03-15T16:00:00Z', '2026-03-15T16:00:00Z');

-- 20. Sunlit Meadow - Small
INSERT INTO builds (id, slug, title, description, biome, house_size, room_count, item_count, layout_code, status, view_count, like_count, created_at, updated_at) VALUES ('bld_picnic_pav_s_20', 'picnic-pavilion', 'Picnic Pavilion', 'An open-air pavilion set among rolling meadow hills, decorated for a Noblegarden celebration. Painted eggs, flower garlands, and a lavish spread of food make this a cheerful seasonal build. Pure holiday joy.', 'sunlit-meadow', 'small', 1, 58, NULL, 'published', 43, 0, '2026-03-16T09:15:00Z', '2026-03-16T09:15:00Z');

-- 21. Twilight Thicket - Medium
INSERT INTO builds (id, slug, title, description, biome, house_size, room_count, item_count, layout_code, status, view_count, like_count, created_at, updated_at) VALUES ('bld_rogue_den_tw_21', 'rogues-den', 'Rogue''s Den', 'A shadowy hideout with a main room concealed behind a false bookcase and a hidden vault in the back. Poison vials, lock picks, and wanted posters create an immersive underworld atmosphere. Trust no one who enters.', 'twilight-thicket', 'medium', 2, 134, NULL, 'published', 6, 0, '2026-03-16T20:30:00Z', '2026-03-16T20:30:00Z');

-- 22. Crystal Cavern - Large
INSERT INTO builds (id, slug, title, description, biome, house_size, room_count, item_count, layout_code, status, view_count, like_count, created_at, updated_at) VALUES ('bld_draenei_temp_22', 'draenei-temple', 'Draenei Temple', 'A luminous temple inspired by Draenei architecture, with soaring crystal arches and pools of holy light. The prayer hall, reliquary, meditation garden, and living quarters are all rendered in exquisite detail.', 'crystal-cavern', 'large', 4, 367, NULL, 'published', 40, 0, '2026-03-17T11:00:00Z', '2026-03-17T11:00:00Z');

-- 23. Volcanic Ridge - Medium
INSERT INTO builds (id, slug, title, description, biome, house_size, room_count, item_count, layout_code, status, view_count, like_count, created_at, updated_at) VALUES ('bld_goblin_works_23', 'goblin-workshop', 'Goblin Workshop', 'A chaotic engineering workshop crammed with half-finished inventions, explosive prototypes, and suspiciously sparking wires. Two rooms: the main lab and a storage closet that might actually be a rocket silo. Caution advised.', 'volcanic-ridge', 'medium', 2, 215, NULL, 'published', 17, 0, '2026-03-17T23:45:00Z', '2026-03-17T23:45:00Z');

-- 24. Coastal Bluff - Medium
INSERT INTO builds (id, slug, title, description, biome, house_size, room_count, item_count, layout_code, status, view_count, like_count, created_at, updated_at) VALUES ('bld_tidal_garden_24', 'tidal-garden-retreat', 'Tidal Garden Retreat', 'A serene two-room coastal retreat with an indoor garden fed by tidal pools. Coral arrangements, driftwood furniture, and sea glass mosaics give it a natural elegance. The balcony overlooks a private cove.', 'coastal-bluff', 'medium', 3, 198, NULL, 'published', 50, 0, '2026-03-18T14:00:00Z', '2026-03-18T14:00:00Z');

-- 25. Sunlit Meadow - Large
INSERT INTO builds (id, slug, title, description, biome, house_size, room_count, item_count, layout_code, status, view_count, like_count, created_at, updated_at) VALUES ('bld_brewfest_hal_25', 'brewfest-hall', 'Brewfest Hall', 'A massive celebration hall built for the annual Brewfest, complete with long feasting tables, towering beer steins, a live music stage, and a kitchen that never stops cooking. Five distinct areas keep the party going all night.', 'sunlit-meadow', 'large', 5, 380, NULL, 'published', 46, 0, '2026-03-19T12:00:00Z', '2026-03-19T12:00:00Z');

-- ============================================================
-- BUILD IMAGES (2-3 per build)
-- ============================================================

-- Build 1: Enchanted Library
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_enchlib_01_main', 'bld_enchanted_lib_01', 'placeholder/enchanted-library/1.jpg', 'Main view of the Enchanted Library with glowing shelves', 0, 1);
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_enchlib_01_loft', 'bld_enchanted_lib_01', 'placeholder/enchanted-library/2.jpg', 'Upper reading loft overlooking the grove', 1, 0);
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_enchlib_01_dtl0', 'bld_enchanted_lib_01', 'placeholder/enchanted-library/3.jpg', 'Close-up of enchanted tomes and wisps', 2, 0);

-- Build 2: Cozy Meadow Cottage
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_cozymdc_02_main', 'bld_cozy_meadow_c_02', 'placeholder/cozy-meadow-cottage/1.jpg', 'Exterior view of the cottage among wildflowers', 0, 1);
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_cozymdc_02_int0', 'bld_cozy_meadow_c_02', 'placeholder/cozy-meadow-cottage/2.jpg', 'Interior fireplace and window seat', 1, 0);

-- Build 3: Shadow Apothecary
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_shadap_03_main0', 'bld_shadow_apoth_03', 'placeholder/shadow-apothecary/1.jpg', 'Apothecary front room with bubbling cauldrons', 0, 1);
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_shadap_03_back0', 'bld_shadow_apoth_03', 'placeholder/shadow-apothecary/2.jpg', 'Private study with forbidden recipe books', 1, 0);
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_shadap_03_dtl00', 'bld_shadow_apoth_03', 'placeholder/shadow-apothecary/3.jpg', 'Detail of reagent shelves and potion bottles', 2, 0);

-- Build 4: Crystal Throne Room
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_crystr_04_main0', 'bld_crystal_thro_04', 'placeholder/crystal-throne-room/1.jpg', 'Grand view of the amethyst throne', 0, 1);
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_crystr_04_pill0', 'bld_crystal_thro_04', 'placeholder/crystal-throne-room/2.jpg', 'Crystal pillars refracting prismatic light', 1, 0);
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_crystr_04_dtl00', 'bld_crystal_thro_04', 'placeholder/crystal-throne-room/3.jpg', 'Rainbow reflections on marble floor', 2, 0);

-- Build 5: Lava Forge Shack
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_lavfrg_05_main0', 'bld_lava_forge_s_05', 'placeholder/lava-forge-shack/1.jpg', 'Exterior of the forge shack on the volcanic vent', 0, 1);
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_lavfrg_05_int00', 'bld_lava_forge_s_05', 'placeholder/lava-forge-shack/2.jpg', 'Glowing anvil and organized tool wall', 1, 0);

-- Build 6: Seaside Tavern
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_seatav_06_main0', 'bld_seaside_tavr_06', 'placeholder/seaside-tavern/1.jpg', 'Tavern exterior overlooking the ocean', 0, 1);
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_seatav_06_bar00', 'bld_seaside_tavr_06', 'placeholder/seaside-tavern/2.jpg', 'Main bar area with ale barrels and bard stage', 1, 0);
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_seatav_06_deck0', 'bld_seaside_tavr_06', 'placeholder/seaside-tavern/3.jpg', 'Upper deck at sunset', 2, 0);

-- Build 7: Druid Sanctuary
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_drusan_07_main0', 'bld_druid_sanctu_07', 'placeholder/druid-sanctuary/1.jpg', 'Living wood exterior with flowering vines', 0, 1);
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_drusan_07_moon0', 'bld_druid_sanctu_07', 'placeholder/druid-sanctuary/2.jpg', 'Indoor moonwell stream and mushroom lighting', 1, 0);

-- Build 8: Harvest Homestead
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_harvhm_08_main0', 'bld_harvest_home_08', 'placeholder/harvest-homestead/1.jpg', 'Farmstead exterior with crops and scarecrow', 0, 1);
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_harvhm_08_kitch', 'bld_harvest_home_08', 'placeholder/harvest-homestead/2.jpg', 'Fully furnished kitchen and dining hall', 1, 0);
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_harvhm_08_pantr', 'bld_harvest_home_08', 'placeholder/harvest-homestead/3.jpg', 'Stocked pantry ready for a feast', 2, 0);

-- Build 9: Witch's Hut
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_witcht_09_main0', 'bld_witchs_hut_s_09', 'placeholder/witchs-hut/1.jpg', 'Witch hut exterior draped in cobwebs', 0, 1);
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_witcht_09_int00', 'bld_witchs_hut_s_09', 'placeholder/witchs-hut/2.jpg', 'Interior with cauldron and arcane totems', 1, 0);

-- Build 10: Gem Cutter's Nook
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_gemcut_10_main0', 'bld_gem_cutters__10', 'placeholder/gem-cutters-nook/1.jpg', 'Workbench with precision gem-cutting tools', 0, 1);
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_gemcut_10_gems0', 'bld_gem_cutters__10', 'placeholder/gem-cutters-nook/2.jpg', 'Gem display catching cavern light', 1, 0);

-- Build 11: Horde War Room
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_hrdwar_11_main0', 'bld_war_room_vol_11', 'placeholder/horde-war-room/1.jpg', 'War room with battle maps and Horde banners', 0, 1);
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_hrdwar_11_weap0', 'bld_war_room_vol_11', 'placeholder/horde-war-room/2.jpg', 'Weapon racks and dark iron corridors', 1, 0);
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_hrdwar_11_dtl00', 'bld_war_room_vol_11', 'placeholder/horde-war-room/3.jpg', 'Close-up of the central battle table', 2, 0);

-- Build 12: Lighthouse Keep
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_lthkep_12_main0', 'bld_lighthouse_k_12', 'placeholder/lighthouse-keep/1.jpg', 'Full lighthouse exterior on the bluff', 0, 1);
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_lthkep_12_sprl0', 'bld_lighthouse_k_12', 'placeholder/lighthouse-keep/2.jpg', 'Spiral staircase with nautical memorabilia', 1, 0);
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_lthkep_12_lamp0', 'bld_lighthouse_k_12', 'placeholder/lighthouse-keep/3.jpg', 'Lamp room at the top with panoramic view', 2, 0);

-- Build 13: Faerie Glen Hideout
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_faergl_13_main0', 'bld_faerie_glen__13', 'placeholder/faerie-glen-hideout/1.jpg', 'Mushroom cap exterior with dangling lanterns', 0, 1);
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_faergl_13_int00', 'bld_faerie_glen__13', 'placeholder/faerie-glen-hideout/2.jpg', 'Miniature interior with hammock', 1, 0);

-- Build 14: Alliance Field Outpost
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_allout_14_main0', 'bld_alliance_out_14', 'placeholder/alliance-outpost/1.jpg', 'Outpost exterior with Alliance lion banner', 0, 1);
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_allout_14_cmd00', 'bld_alliance_out_14', 'placeholder/alliance-outpost/2.jpg', 'Command room with operations map', 1, 0);
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_allout_14_brrk0', 'bld_alliance_out_14', 'placeholder/alliance-outpost/3.jpg', 'Military-precision barracks', 2, 0);

-- Build 15: Necromancer's Manor
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_necman_15_main0', 'bld_necro_manor__15', 'placeholder/necromancers-manor/1.jpg', 'Gothic manor facade shrouded in shadow', 0, 1);
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_necman_15_crypt', 'bld_necro_manor__15', 'placeholder/necromancers-manor/2.jpg', 'Summoning chamber with dark ritual circle', 1, 0);
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_necman_15_banqt', 'bld_necro_manor__15', 'placeholder/necromancers-manor/3.jpg', 'Banquet hall with spectral guests', 2, 0);

-- Build 16: Arcane Laboratory
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_arclab_16_main0', 'bld_arcane_lab_c_16', 'placeholder/arcane-laboratory/1.jpg', 'Main lab with floating orbs and apparatus', 0, 1);
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_arclab_16_eqtn0', 'bld_arcane_lab_c_16', 'placeholder/arcane-laboratory/2.jpg', 'Walls covered in arcane equations', 1, 0);

-- Build 17: Molten Fortress
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_mltfor_17_main0', 'bld_molten_forte_17', 'placeholder/molten-fortress/1.jpg', 'Dark iron fortress exterior amid lava flows', 0, 1);
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_mltfor_17_cncl0', 'bld_molten_forte_17', 'placeholder/molten-fortress/2.jpg', 'War council chamber with lava-lit walls', 1, 0);
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_mltfor_17_armr0', 'bld_molten_forte_17', 'placeholder/molten-fortress/3.jpg', 'Armory stocked with dark iron weapons', 2, 0);

-- Build 18: Fisher's Shanty
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_fishsh_18_main0', 'bld_fishers_shan_18', 'placeholder/fishers-shanty/1.jpg', 'Shanty on stilts over the water', 0, 1);
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_fishsh_18_int00', 'bld_fishers_shan_18', 'placeholder/fishers-shanty/2.jpg', 'Interior with fishing nets and cook pot', 1, 0);

-- Build 19: Moonwell Palace
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_mnwpal_19_main0', 'bld_moonwell_pal_19', 'placeholder/moonwell-palace/1.jpg', 'Palace exterior with four seasonal wings', 0, 1);
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_mnwpal_19_moon0', 'bld_moonwell_pal_19', 'placeholder/moonwell-palace/2.jpg', 'Central moonwell glowing with arcane energy', 1, 0);
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_mnwpal_19_wing0', 'bld_moonwell_pal_19', 'placeholder/moonwell-palace/3.jpg', 'Autumn wing with falling leaf effects', 2, 0);

-- Build 20: Picnic Pavilion
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_picpav_20_main0', 'bld_picnic_pav_s_20', 'placeholder/picnic-pavilion/1.jpg', 'Open-air pavilion decorated for Noblegarden', 0, 1);
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_picpav_20_food0', 'bld_picnic_pav_s_20', 'placeholder/picnic-pavilion/2.jpg', 'Lavish food spread with painted eggs', 1, 0);

-- Build 21: Rogue's Den
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_rogden_21_main0', 'bld_rogue_den_tw_21', 'placeholder/rogues-den/1.jpg', 'Hidden entrance behind false bookcase', 0, 1);
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_rogden_21_vault', 'bld_rogue_den_tw_21', 'placeholder/rogues-den/2.jpg', 'Vault room with poison vials and lockpicks', 1, 0);
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_rogden_21_wntd0', 'bld_rogue_den_tw_21', 'placeholder/rogues-den/3.jpg', 'Wanted posters and shadowy atmosphere', 2, 0);

-- Build 22: Draenei Temple
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_dratmp_22_main0', 'bld_draenei_temp_22', 'placeholder/draenei-temple/1.jpg', 'Temple exterior with crystal arches', 0, 1);
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_dratmp_22_pray0', 'bld_draenei_temp_22', 'placeholder/draenei-temple/2.jpg', 'Prayer hall bathed in holy light', 1, 0);
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_dratmp_22_grdn0', 'bld_draenei_temp_22', 'placeholder/draenei-temple/3.jpg', 'Meditation garden with crystal pools', 2, 0);

-- Build 23: Goblin Workshop
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_gobwrk_23_main0', 'bld_goblin_works_23', 'placeholder/goblin-workshop/1.jpg', 'Chaotic workshop exterior with smoke stacks', 0, 1);
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_gobwrk_23_lab00', 'bld_goblin_works_23', 'placeholder/goblin-workshop/2.jpg', 'Main lab with sparking inventions', 1, 0);

-- Build 24: Tidal Garden Retreat
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_tidgar_24_main0', 'bld_tidal_garden_24', 'placeholder/tidal-garden-retreat/1.jpg', 'Retreat exterior with tidal pool garden', 0, 1);
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_tidgar_24_int00', 'bld_tidal_garden_24', 'placeholder/tidal-garden-retreat/2.jpg', 'Indoor coral arrangements and sea glass mosaics', 1, 0);
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_tidgar_24_balc0', 'bld_tidal_garden_24', 'placeholder/tidal-garden-retreat/3.jpg', 'Balcony overlooking the private cove', 2, 0);

-- Build 25: Brewfest Hall
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_brwfst_25_main0', 'bld_brewfest_hal_25', 'placeholder/brewfest-hall/1.jpg', 'Grand hall exterior with Brewfest banners', 0, 1);
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_brwfst_25_fest0', 'bld_brewfest_hal_25', 'placeholder/brewfest-hall/2.jpg', 'Long feasting tables and towering beer steins', 1, 0);
INSERT INTO build_images (id, build_id, r2_key, alt_text, sort_order, is_primary) VALUES ('img_brwfst_25_stge0', 'bld_brewfest_hal_25', 'placeholder/brewfest-hall/3.jpg', 'Live music stage and kitchen area', 2, 0);

-- ============================================================
-- BUILD TAGS (3-5 per build)
-- ============================================================

-- 1. Enchanted Library
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_enchanted_lib_01', 'tag_elegant_00000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_enchanted_lib_01', 'tag_library_00000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_enchanted_lib_01', 'tag_nature_000000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_enchanted_lib_01', 'tag_themed_000000000');

-- 2. Cozy Meadow Cottage
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_cozy_meadow_c_02', 'tag_cozy_00000000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_cozy_meadow_c_02', 'tag_rustic_000000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_cozy_meadow_c_02', 'tag_minimalist_00000');

-- 3. Shadow Apothecary
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_shadow_apoth_03', 'tag_gothic_000000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_shadow_apoth_03', 'tag_themed_000000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_shadow_apoth_03', 'tag_workshop_0000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_shadow_apoth_03', 'tag_industrial_00000');

-- 4. Crystal Throne Room
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_crystal_thro_04', 'tag_elegant_00000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_crystal_thro_04', 'tag_themed_000000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_crystal_thro_04', 'tag_alliance_0000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_crystal_thro_04', 'tag_gothic_000000000');

-- 5. Lava Forge Shack
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_lava_forge_s_05', 'tag_industrial_00000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_lava_forge_s_05', 'tag_workshop_0000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_lava_forge_s_05', 'tag_minimalist_00000');

-- 6. Seaside Tavern
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_seaside_tavr_06', 'tag_tavern_000000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_seaside_tavr_06', 'tag_cozy_00000000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_seaside_tavr_06', 'tag_rustic_000000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_seaside_tavr_06', 'tag_themed_000000000');

-- 7. Druid Sanctuary
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_druid_sanctu_07', 'tag_nature_000000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_druid_sanctu_07', 'tag_elegant_00000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_druid_sanctu_07', 'tag_cozy_00000000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_druid_sanctu_07', 'tag_garden_000000000');

-- 8. Harvest Homestead
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_harvest_home_08', 'tag_rustic_000000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_harvest_home_08', 'tag_cozy_00000000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_harvest_home_08', 'tag_garden_000000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_harvest_home_08', 'tag_alliance_0000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_harvest_home_08', 'tag_themed_000000000');

-- 9. Witch's Hut
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_witchs_hut_s_09', 'tag_gothic_000000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_witchs_hut_s_09', 'tag_themed_000000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_witchs_hut_s_09', 'tag_minimalist_00000');

-- 10. Gem Cutter's Nook
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_gem_cutters__10', 'tag_workshop_0000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_gem_cutters__10', 'tag_minimalist_00000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_gem_cutters__10', 'tag_elegant_00000000');

-- 11. Horde War Room
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_war_room_vol_11', 'tag_horde_0000000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_war_room_vol_11', 'tag_industrial_00000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_war_room_vol_11', 'tag_themed_000000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_war_room_vol_11', 'tag_gothic_000000000');

-- 12. Lighthouse Keep
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_lighthouse_k_12', 'tag_rustic_000000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_lighthouse_k_12', 'tag_cozy_00000000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_lighthouse_k_12', 'tag_themed_000000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_lighthouse_k_12', 'tag_elegant_00000000');

-- 13. Faerie Glen Hideout
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_faerie_glen__13', 'tag_nature_000000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_faerie_glen__13', 'tag_cozy_00000000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_faerie_glen__13', 'tag_minimalist_00000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_faerie_glen__13', 'tag_themed_000000000');

-- 14. Alliance Field Outpost
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_alliance_out_14', 'tag_alliance_0000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_alliance_out_14', 'tag_industrial_00000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_alliance_out_14', 'tag_themed_000000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_alliance_out_14', 'tag_minimalist_00000');

-- 15. Necromancer's Manor
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_necro_manor__15', 'tag_gothic_000000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_necro_manor__15', 'tag_elegant_00000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_necro_manor__15', 'tag_themed_000000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_necro_manor__15', 'tag_horde_0000000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_necro_manor__15', 'tag_holiday_00000000');

-- 16. Arcane Laboratory
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_arcane_lab_c_16', 'tag_industrial_00000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_arcane_lab_c_16', 'tag_workshop_0000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_arcane_lab_c_16', 'tag_themed_000000000');

-- 17. Molten Fortress
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_molten_forte_17', 'tag_industrial_00000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_molten_forte_17', 'tag_horde_0000000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_molten_forte_17', 'tag_gothic_000000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_molten_forte_17', 'tag_themed_000000000');

-- 18. Fisher's Shanty
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_fishers_shan_18', 'tag_rustic_000000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_fishers_shan_18', 'tag_cozy_00000000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_fishers_shan_18', 'tag_minimalist_00000');

-- 19. Moonwell Palace
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_moonwell_pal_19', 'tag_elegant_00000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_moonwell_pal_19', 'tag_nature_000000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_moonwell_pal_19', 'tag_alliance_0000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_moonwell_pal_19', 'tag_garden_000000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_moonwell_pal_19', 'tag_themed_000000000');

-- 20. Picnic Pavilion
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_picnic_pav_s_20', 'tag_holiday_00000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_picnic_pav_s_20', 'tag_cozy_00000000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_picnic_pav_s_20', 'tag_garden_000000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_picnic_pav_s_20', 'tag_themed_000000000');

-- 21. Rogue's Den
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_rogue_den_tw_21', 'tag_gothic_000000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_rogue_den_tw_21', 'tag_industrial_00000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_rogue_den_tw_21', 'tag_themed_000000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_rogue_den_tw_21', 'tag_horde_0000000000');

-- 22. Draenei Temple
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_draenei_temp_22', 'tag_elegant_00000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_draenei_temp_22', 'tag_alliance_0000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_draenei_temp_22', 'tag_nature_000000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_draenei_temp_22', 'tag_garden_000000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_draenei_temp_22', 'tag_themed_000000000');

-- 23. Goblin Workshop
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_goblin_works_23', 'tag_industrial_00000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_goblin_works_23', 'tag_workshop_0000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_goblin_works_23', 'tag_horde_0000000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_goblin_works_23', 'tag_themed_000000000');

-- 24. Tidal Garden Retreat
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_tidal_garden_24', 'tag_nature_000000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_tidal_garden_24', 'tag_garden_000000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_tidal_garden_24', 'tag_elegant_00000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_tidal_garden_24', 'tag_cozy_00000000000');

-- 25. Brewfest Hall
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_brewfest_hal_25', 'tag_tavern_000000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_brewfest_hal_25', 'tag_holiday_00000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_brewfest_hal_25', 'tag_cozy_00000000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_brewfest_hal_25', 'tag_rustic_000000000');
INSERT INTO build_tags (build_id, tag_id) VALUES ('bld_brewfest_hal_25', 'tag_themed_000000000');
