From node:latest
WORKDIR Real_chat
COPY . .
ENV PORT 8080
ENV HOST 0.0.0.0

CMD npm run dev

