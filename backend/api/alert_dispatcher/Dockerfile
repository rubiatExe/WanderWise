# Use latest stable channel SDK.
FROM dart:stable AS build

# Resolve app dependencies.
WORKDIR /app
COPY pubspec.* ./
RUN dart pub get

# Copy app source code.
COPY . .

# Ensure dependencies are ready.
RUN dart pub get --offline

# Compile app.
RUN mkdir -p /app/bin
RUN dart compile exe main.dart -o /app/bin/server

# Build minimal serving image.
FROM scratch
COPY --from=build /runtime/ /
COPY --from=build /app/bin/server /app/bin/server

# Start server.
EXPOSE 8080
CMD ["/app/bin/server"]
