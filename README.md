# Tiro - LærlingLink

Tiro er en plattform som kobler fremtidige lærlinger med bedrifter på en enkel og effektiv måte. Elever kan opprette profesjonelle profiler for å vise frem sine ferdigheter, prosjekter og annen relevant informasjon, mens bedrifter kan søke etter kandidater basert på spesifikke kriterier.

## Funksjonalitet

- **For lærlinger:**
  - Registrer deg og opprett en profil med personlig informasjon, ferdigheter, prosjekter og utdanningsbakgrunn.
  - Gjør deg synlig for bedrifter uten å måtte søke aktivt.

- **For bedrifter:**
  - Søk etter lærlinger basert på ferdigheter, fagområde og lokasjon.
  - Kontakt lærlinger direkte gjennom plattformen.

## Teknologi

- **Frontend:**
  - EJS (Embedded JavaScript) for server-side rendering.
  - Bootstrap for responsivt design.

- **Backend:**
  - Node.js med Express for serverlogikk.
  - MongoDB med Mongoose for databasehåndtering.

- **Andre verktøy:**
  - PM2 for prosesshåndtering.
  - Nginx for hosting og DNS.
  - FNM (Fast Node Manager) for Node.js-versjonshåndtering.

## Installasjon

1. **Klon prosjektet:**
   ```bash
   git clone <repository-url>
   cd tiro-developement
   ```

2. **Installer avhengigheter:**
   ```bash
   npm install
   ```

3. **Konfigurer miljøvariabler:**
   Opprett en `.env`-fil basert på `.env.example` og fyll inn nødvendige verdier:
   ```env
   PORT=3000
   MONGO_URI=mongodb://<IP-ADRESSE>/tiro
   SESSION_SECRET=<din-sikre-nøkkel>
   ```

4. **Start serveren:**
   ```bash
   npm start
   ```

## Deployment

- **Produksjonsmiljø:**
  - Bruk PM2 for å kjøre applikasjonen som en bakgrunnsprosess.
  - Konfigurer Nginx som en omvendt proxy for å håndtere trafikk.

- **CI/CD:**
  - GitHub Actions brukes for testing og automatisk deploy via SSH.

## Bidrag

1. Fork prosjektet.
2. Lag en ny branch for dine endringer.
3. Send inn en pull request når endringene er klare.