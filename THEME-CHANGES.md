# Siddhi Kabel e-shop — Corporate Blue theme (copy)

This folder is a COPY of `siddhi-eshop`. The original black/maroon site was not modified.

## Palette

| Role                                                  | Colour                                       |
| ----------------------------------------------------- | -------------------------------------------- |
| Royal blue (header, hero, dark panels, footer)        | #1E40AF – #1D4ED8 range, deep tones ~#13307F |
| Light blue (accents, buttons on dark, chips, borders) | #38BDF8 / #7DD3FC / #DBEAFE                  |
| Red (RFQ Cart, key highlights, LAPP accent)           | #D9262E / red-600                            |
| Gray / slate (secondary text, borders)                | #475569 / #64748B / #CBD5E1                  |
| White / ice (page + cards)                            | #FFFFFF / #F8FAFC                            |
| Body & heading text                                   | #172B4D (navy-slate, replaces near-black)    |

## Where each colour is used (mixed layout, not all blue)

- WHITE: header bar, cards, forms, page background (with a thin red line under the header)
- ROYAL BLUE: top bar, menu text, Contact button, hero image frame, RFQ band, footer, headings
- LIGHT BLUE: Eaton accents, chips, icons, hover states
- RED: RFQ Cart button, LAPP tab/CTA, active slide dots, section top-borders
- GRAY: Mennekes accents, Sales Desk panel, secondary text, borders

## What changed

- Header, top bar, menu, footer: maroon/black -> royal blue; RFQ Cart button -> red with white text.
- Hero slider (BrandsShowcase / HeroSlider / HeroBanner) and brand portfolio panels: black/brown/green/purple gradients -> royal blue family; brand accents mapped to LAPP=red, EATON=light blue, PARTEX=royal blue, MENNEKES=gray.
- Fonts: near-black text -> navy-slate; light text on blue panels kept white / ice blue.
- Page background: cream/pink tint -> ice-blue/white.
- Images: `public/images/slider1.jpg` (black night-city cable photo) and `switchgear.jpg` regraded to blue.
- Pop-ups (cart, search, sign-in, support, RFQ, company), PDF quotation colours and legacy static HTML pages recoloured too.

## Corporate light pass

- The corporate copy now removes any saved dark-mode class on first paint, so it cannot inherit the original site's black layout.
- The homepage product slider uses a pale-blue image frame, and the contact strip and footer use light-blue surfaces with high-contrast navy/gray text and restrained red accents.

## Run

npm install && npm run dev (or: npm run build -> dist/)
