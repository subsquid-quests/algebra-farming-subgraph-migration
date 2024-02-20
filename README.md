<p align="center">
<picture>
    <source srcset="https://github.com/subsquid-quests/network-test-one-uniform-load-squid/assets/7452464/135746dc-a48b-46b8-bce0-f7e5de18f4f9" media="(prefers-color-scheme: dark)">
    <img src="https://github.com/subsquid-quests/network-test-one-uniform-load-squid/assets/7452464/135746dc-a48b-46b8-bce0-f7e5de18f4f9" alt="Subsquid Logo">
</picture>
</p>

[![docs.rs](https://docs.rs/leptos/badge.svg)](https://docs.subsquid.io/)
[![Discord](https://img.shields.io/discord/1031524867910148188?color=%237289DA&label=discord)](https://discord.gg/subsquid)

[Website](https://subsquid.io) | [Docs](https://docs.subsquid.io/) | [Discord](https://discord.gg/subsquid)

# Algebra Farming Subgraph migration

Migrate the [Algebra Farming subgraph](https://thegraph.com/hosted-service/subgraph/stellaswap/pulsar-farming) to Squid SDK.

> [!IMPORTANT]
> This quest is sponsored by [StellaSwap](https://stellaswap.com) who generously offered to provide two extra rewards of $500 (in STELLA tokens) each. The rewards will be given to the authors of two submissions selected by StellaSwap from the pool of five Subsquid-selected winners. See [Special considerations](#special-considerations) for extra info.

Subgraph source code is available at the `AlgebraFarming` folder or this repo. The resulting squid should match the GraphQL API of the subgraph as close as possible, by migrating `schema.graphql` (see [Permissible deviations](#permissible-deviations-from-the-subgraph-schema)). The judges reserve the right to request improvements afther the initial review of the submission. Reach out to the [Discord Channel]( https://discord.com/channels/857105545135390731/1155812879770058783) for any tech questions regarding this quest. You can use the ```template``` squid as a starter.

# Quest Info

| Category         | Skill Level                           | Time required (hours) | Max Participants | Reward                                | Status |
| ---------------- | ------------------------------------- | --------------------- | ---------------- | ------------------------------------- | ------ |
| Migration        | $\textcolor{orange}{\textsf{Medium}}$ | ~10                   | 10               | $\textcolor{red}{\textsf{200tSQD}}$ + StellaSwap rewards | open   |

Two of the winning submissions will be selected by StellaSwap for extra rewards of $500 (in STELLA tokens) each.

# Acceptance criteria

## General

This section describes the criteria put forth by Subsquid. See [Special considerations](#special-considerations) for StellaSwap info.

Ultimately, the solutions are accepted at the discretion of judges following a manual review. This sections is a rough guide that is in no way binding on our side.

Some of the reasons why the solution will not be accepted include:

- The submission is an unmodified squid template. We **will not** reward these by chance. Give up.
- We receive two or more solutions with identical or almost identical code. If we detect that, either one or none of the affected submissions will be rewarded, depending on your luck.
- The squid does not start.
- The squid fails to sync fully due to internal errors.
- The squid fails to sync fully in a reasonable time due to severe performance issues. Follow the [best practices guide](https://docs.subsquid.io/cloud/resources/best-practices/) to avoid these.
- The squid writes no data into its database.
- Data returned for any query is not consistent with subgraph data. You may find [this tool](https://github.com/abernatskiy/compareGraphQL) useful for comparing squid and subgraph APIs.

It is desirable that your solution:

- includes a suite of test GraphQL queries that touches every [schema entity](https://docs.subsquid.io/store/postgres/schema-file/entities/) and, if used, every [custom resolver](https://docs.subsquid.io/graphql-api/custom-resolvers/) at least once, with corresponding subgraph queries (listing in README is enough)
- has high code quality (readability, simplicity, comments where necessary)
- avoids any "sleeping bugs": logic errors that accidentally happen to not break the data
- follows the standard squid startup procedure:
  ```
  git clone <repo_url>
  cd <repo_url>
  npm ci
  sqd up
  sqd process &
  sqd serve
  ```
  If it does not, describe your startup procedure in the README.

**Please test your solutions before submitting.** We do allow some corrections, but judges' time is not limitless.

> [!IMPORTANT]
> To ensure fair competition and timely delivery of squids to StellaSwap, we limit the time allotted for post-deadline corrections to two weeks. The limit will be enforced.

To submit, invite the following github accounts to your private repo : [@dariaag](https://github.com/dariaag), [@belopash](https://github.com/belopash), [@abernatskiy](https://github.com/abernatskiy) and [@dzhelezov](https://github.com/dzhelezov).

## Permissible deviations from the subgraph schema

* You can use `String` in place of `Bytes` in your submissions
* The only way to handle [many-to-many relations](https://docs.subsquid.io/sdk/reference/schema-file/entity-relations/#many-to-many-relations) in squids is by adding explicit join tables. Addition of such tables is an expected change when schemas with such relations are migrated.

## Special considerations

The subgraph took an extremely long time to sync on TheGraph. The StellaSwap team wants to improve upon that as much as possible. So, the advice is to pay extra attention to performance-related matters. Use [batch processing](https://docs.subsquid.io/sdk/resources/basics/batch-processing/) and [database indexes](https://docs.subsquid.io/sdk/reference/schema-file/indexes-and-constraints/) for best results.

# Rewards

tSQD rewards will be delivered via the [quests page](https://app.subsquid.io/quests) of Subsquid Cloud. Make sure you use the same GitHub handle to make a submission and when linking to that page.

STELLA rewards from StellaSwap will be sent to addresses individually agreed upon with each winner. We'll make a GitHub issue in each of the winning repos for the discussion.

Winners (both the five selected by Subsquid and the two selected by StellaSwap) will be listed at the quest repository README. If you do not wish to be listed please tell us that in an issue in your submission repo.

# Useful links

- [Squid development master guide](https://docs.subsquid.io/sdk/how-to-start/squid-development/)
- [TheGraph migration guide](https://docs.subsquid.io/migrate/migrate-subgraph/)
- [Subsquid Cloud best practices guide](https://docs.subsquid.io/cloud/resources/best-practices/) (includes a lot of good non-Cloud related advice)
- [compareGraphQL tool](https://github.com/abernatskiy/compareGraphQL)

# Setup and common errors

1. Install Node v16.x or newer [https://nodejs.org/en/download](https://nodejs.org/en/download)
2. Install Docker [https://docs.docker.com/engine/install/](https://docs.docker.com/engine/install/)
3. Install git [https://git-scm.com/book/en/v2/Getting-Started-Installing-Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
4. Install Squid CLI

    ```bash
    npm i -g @subsquid/cli@latest
    ```

## How to run a squid

Full startup procedure for newly developed squids:

1. Install dependecies:

```bash
npm ci
```

2. Generate model

```bash
sqd codegen
```

3. Generate types

```bash
sqd typegen
```

4. Build the squid

```bash
sqd build
```

5. Open docker and run:

```bash
sqd up
```

6. Generate migrations:

```bash
sqd migration:generate
```

7. Start processing:

```bash
sqd process
```

8. Start a local GraphQL server in a separate terminal:

```bash
sqd serve
```

Types (`./src/abi`), models (`./src/model`) and migrations (`./db`) are typically kept within squid repos after they become stable. Then the startup procedure simplifies to
```bash
npm ci
sqd up
sqd process &
sqd serve
```

## Possible errors

1. Docker not installed

```bash
X db Error × query-gateway Error
Error response from daemon: Get "https://registry-1.docker.jo/v2/": uri ting to 127.0.0.1:8888: dial cp 127.0.0.1:8888: connectex: No connection
```

2. Git not installed

```bash
Error: Error: spawn git ENOENT
at ChildProcess._handle.onexit (node: internal/child_process: 284:19)
at onErrorNT (node: internal/child_process:477:16)
at process.processTicksAndRejections (node: internal/process/task_queues:82:21)
```

3. Dependencies not installed. Run `npm ci`

```bash
sqd typegen
TYPEGEN
    Error: spawn squid-evm-typegen ENOENT
    Code: ENOENT
```

4. Rate-limiting. Get a private RPC endpoint from [any node provider](https://ethereumnodes.com), then change the `rpcUrl` in `processor.ts`

```bash
will pause new requests for 20000ms {"rpcUrl":"https://rpc.ankr.com/eth",
"reason" : "HttpError: got 429 from https://rpc.ankr.com/eth"}
```
   If necessary, [rate limit your RPC queries](https://docs.subsquid.io/evm-indexing/configuration/initialization/#set-data-source).

## Best practices extras

1. Batch saving
```bash
let transfers: Transfers[] = [];
...
ctx.store.save(transfers);
```

2. Using map instead of array to avoid duplicate values
```bash
let transfers: Map<string, Transfer> = new Map();
...
ctx.store.upsert([...transfers.values()]);
```

3. Verify both log addresses and topics before processing events.
```bash
 if (log.topics[0] === erc721.events.Transfer.topic && log.address === CONTRACT_ADDRESS) {
...
}
```
