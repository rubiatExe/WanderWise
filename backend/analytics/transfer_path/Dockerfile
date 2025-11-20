FROM dart:stable AS build

WORKDIR /app
COPY pubspec.yaml .
RUN dart pub get

COPY . .
RUN dart compile exe main.dart -o server

FROM scratch
COPY --from=build /runtime/ /
COPY --from=build /app/server /app/bin/

EXPOSE 8080
CMD ["/app/bin/server"]
