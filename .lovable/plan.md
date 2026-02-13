

# 🎰 Casino Game Platform — Complete Build Plan

## Overview
A full-featured online casino platform inspired by bd678.win, with dark neon design, Bengali + English language support, user panel, admin panel, game API integration, and payment gateway support.

---

## Phase 1: Foundation & Authentication
- **Supabase Cloud setup** with database, auth, and edge functions
- **User registration & login** (email, phone number)
- **User profiles** with KYC status, wallet balance, and verification level
- **Wallet system** — internal balance tracking with deposit/withdrawal history
- **User roles** — player, agent, admin (stored securely in separate roles table)
- **Bengali + English** language toggle throughout the app

---

## Phase 2: User Panel (Player Dashboard)
- **Home page** — dark neon theme with game category banners, promotions carousel, and featured games
- **Game lobby** — categorized sections: Slots, Live Casino, Sports, Crash/Mini Games
- **Game categories with filtering** — provider filter, popular, new, favorites
- **Wallet page** — balance display, deposit, withdraw, transaction history
- **Profile settings** — personal info, password change, language preference
- **Promotions page** — active bonuses, welcome offers, referral rewards
- **Referral system** — unique referral link, commission tracking
- **Bet history** — complete log of all game activity

---

## Phase 3: Game Integration Layer
- **Game API connector** via Supabase edge functions — designed to integrate with providers like SoftSwiss, BetConstruct, or similar aggregators
- **Game launcher** — iframe-based game loading with session management
- **Demo/fun mode** toggle for games
- **Crash game** — simple provably fair crash game (can be built custom)
- **Dice/Mines mini-games** — simple custom-built mini-games as starter content
- **Sports betting UI** — match listing, odds display, bet slip, live scores section

---

## Phase 4: Payment Gateway Integration
- **Crypto payments** — deposit/withdrawal via edge function integration (designed for providers like CoinPayments, NOWPayments)
- **Mobile payments** — bKash, Nagad, Rocket integration via edge functions
- **Deposit flow** — amount selection → payment method → confirmation → balance update
- **Withdrawal flow** — amount & method selection → admin approval queue → processing
- **Transaction ledger** — complete audit trail of all financial movements

---

## Phase 5: Admin Panel
- **Dashboard** — real-time stats: active users, revenue, deposits, withdrawals, profit/loss
- **User management** — view all users, KYC verification, account status (ban/suspend/activate)
- **Financial management** — pending withdrawals approval queue, deposit verification, manual balance adjustments
- **Game management** — enable/disable games, manage game providers, view game performance
- **Promotion management** — create/edit bonuses, welcome offers, and referral commission rates
- **Agent system** — create agents, set commission structures, track agent performance
- **Reports** — daily/weekly/monthly revenue reports, player activity reports
- **Site settings** — manage banners, announcements, maintenance mode

---

## Phase 6: Polish & Production Readiness
- **Responsive design** — mobile-first, works on all devices
- **Real-time notifications** — deposit confirmations, withdrawal status, promotions
- **Security hardening** — RLS policies on all tables, input validation, rate limiting
- **SEO and meta tags** setup

---

## ⚠️ What You'll Need to Arrange Separately
- **Gambling license** (Curaçao, Malta, etc.) — required for legal operation
- **Game API provider contract** (SoftSwiss, BetConstruct, etc.) — provides actual game content
- **Payment gateway accounts** (bKash business account, crypto payment provider)
- **Domain and hosting** — custom domain can be connected via Lovable settings

---

## Tech Stack
- **Frontend**: React + TypeScript + Tailwind CSS (dark neon theme)
- **Backend**: Supabase (database, auth, edge functions, real-time)
- **Payments**: Edge functions connecting to payment provider APIs
- **Games**: Edge functions connecting to game aggregator APIs

