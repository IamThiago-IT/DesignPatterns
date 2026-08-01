FROM oven/bun:1.2-alpine

WORKDIR /app

COPY package.json ./

RUN bun install --production --ignore-scripts

COPY . .

CMD ["bun", "run", "index.ts"]
