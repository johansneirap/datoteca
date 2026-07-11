# @datoteca/cli

Command-line interface for [Datoteca](https://github.com/johansneirap/datoteca) — generate realistic, localized Chilean test data (RUT, people, addresses, phones, money, companies) from the terminal, no TypeScript/JavaScript required. Useful for populating fixtures, generating CSV/JSON for QA, or feeding non-JS stacks (Go, Python, etc.).

Every command wraps [`@datoteca/cl`](https://www.npmjs.com/package/@datoteca/cl) — same seeded determinism guarantee: same seed and flags, always the same output.

## Installation

Run without installing:

```sh
npx @datoteca/cli person --seed 42 --count 3
```

Or install it globally:

```sh
npm install -g @datoteca/cli
datoteca person --seed 42 --count 3
```

## Usage

```sh
datoteca <command> [options]
```

### Common options (every command)

| Flag | Description | Default |
| --- | --- | --- |
| `-s, --seed <seed>` | Seed (integer or text) | `1` |
| `-c, --count <count>` | Number of records to generate | `1` |
| `-f, --format <format>` | Output format: `json`, `csv`, `ndjson` | `json` |

Output always goes to stdout, so it composes with shell redirection:

```sh
npx @datoteca/cli person --seed 42 --count 100 --format csv > fixtures.csv
npx @datoteca/cli money --seed 42 --format ndjson | jq '.amount'
```

### Commands

**`rut`** — Chilean RUT (same algorithm for people and companies)

```sh
datoteca rut --seed 42 --count 5
datoteca rut --rut-format dots --no-dv
```

| Flag | Description | Default |
| --- | --- | --- |
| `--rut-format <format>` | `raw`, `dash`, `dots` | `dash` |
| `--no-dv` | Omit the check digit | (included) |

Output row: `{ rut }`.

**`person`** — natural persons. Output row: `{ firstName, lastName, fullName }`. No generator-specific flags; each field is drawn independently from the shared RNG stream, mirroring how `@datoteca/cl` itself works.

```sh
datoteca person --seed 42 --count 10 --format ndjson
```

**`address`** — Chilean addresses (real comunas). Output row: `{ commune, street, fullAddress }`.

```sh
datoteca address --seed 42 --count 10 --format csv
```

**`phone`** — Chilean phone numbers. Output row: `{ mobile, landline }`.

```sh
datoteca phone --seed 42 --count 10
```

**`money`** — CLP or UF amounts.

```sh
datoteca money --seed 42 --currency UF --min 10 --max 500 --count 20
```

| Flag | Description | Default |
| --- | --- | --- |
| `--currency <currency>` | `CLP`, `UF` | `CLP` |
| `--min <min>` | Minimum amount | generator default |
| `--max <max>` | Maximum amount | generator default |

Output row: `{ currency, amount, formatted }` — `amount` is the raw number, `formatted` is the `es-CL` formatted string (e.g. `$45.000` or `UF 1.234,56`).

**`company`** — Chilean companies. Output row: `{ businessName, industry }`.

```sh
datoteca company --seed 42 --count 10
```

### Errors

Invalid arguments (negative `--count`, unknown `--format`, `--min` greater than `--max`, etc.) print a clear message to stderr and exit with a non-zero code — safe to use in scripts with `set -e`.

## Determinism

```sh
datoteca person --seed 42 --count 5   # run twice, byte-for-byte identical output
```

Same as the core library: the guarantee is seed **and** call order together. See [docs/determinism.md](https://github.com/johansneirap/datoteca/blob/main/docs/determinism.md) in the main repo for details.

## License

MIT — see [LICENSE](https://github.com/johansneirap/datoteca/blob/main/packages/cli/LICENSE).
