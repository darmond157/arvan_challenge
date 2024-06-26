# arvan_challenge

###
### database scheme:
<img src="./assets/database.png" alt="database picture ..." title="database"/>

### how to run:

generally, this project includes 2 services: <b>wallet</b> and <b>discount</b>.
the wallet service hold responsibility of managing wallets and transactions and discount service is responsible for managing codes, both charge codes and discount codes.

## APIs

| API | Req | Res |
| --- | --- | --- |
/health | - | 200 or 500 |
/test_publish | - | done |
/test_insert | - | ok |

## API description

| API | Description |
| - | - |
/health | this api checks connection for rabbitmq & mongodb and returns 200 or 500 as status code.|
/test_publish | this api sends a log into rabbitmq and returns "done". |
/test_insert | this api send a log into mongodb and returns "ok".

## Data Format

```javascript
{
		collection: "collectionName",
		body: {
			challengeID: "...",
			uid: "...",
			site_key: "...",
			domain: "...",
			ctype: "...",
			success: true/false,
			verified: true/false,
			score: 0,
			lang: "fa/en",
			time: "2000-01-01T00:00:00.966370432Z",
			jalali: "1000/01/01",
		},
		filter: { challengeID: "..." },
		update: { $set: { success: true/false, verified: true/false } },
	}
```

## Rules
+ functions are PascalCase
+ files are camelCase