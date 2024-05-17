-- CreateTable
CREATE TABLE "casts" (
    "id" SERIAL NOT NULL,
    "giver_fid" INTEGER,
    "hash" VARCHAR(255),
    "date" TIMESTAMP(6),

    CONSTRAINT "casts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tips" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(6) NOT NULL,
    "giver_fid" INTEGER NOT NULL,
    "recipient_fid" INTEGER NOT NULL,
    "amount" DECIMAL NOT NULL,
    "hash" VARCHAR(255) NOT NULL,
    "parent_hash" VARCHAR(255),

    CONSTRAINT "tips_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "is_eligible" BOOLEAN NOT NULL,
    "daily_allowance" DECIMAL NOT NULL,
    "allowance_remaining" DECIMAL NOT NULL,
    "allowance_tipped" DECIMAL NOT NULL,
    "daily_amount_received" DECIMAL NOT NULL,
    "total_amount_tipped" DECIMAL(65,30) NOT NULL,
    "daily_tip_count" INTEGER NOT NULL,
    "days_since_last_points" INTEGER NOT NULL,
    "points" DECIMAL(65,30) NOT NULL,
    "artworks_created" INTEGER NOT NULL,
    "bid_or_offer_placed" INTEGER NOT NULL,
    "tips_given" INTEGER NOT NULL,
    "price_set_or_auction_scheduled" INTEGER NOT NULL,
    "artwork_purchased" INTEGER NOT NULL,
    "token_like" INTEGER NOT NULL,
    "casts" INTEGER NOT NULL,
    "cast_likes" INTEGER NOT NULL,
    "cast_recasts" INTEGER NOT NULL,
    "cast_replies" INTEGER NOT NULL,
    "replies" INTEGER NOT NULL,
    "likes" INTEGER NOT NULL,
    "artwork_tips_given" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "fids" INTEGER[],
    "total_amount_received" DECIMAL NOT NULL,
    "total_tip_count" DECIMAL NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_address_date_key" ON "users"("address", "date");
