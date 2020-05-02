# Twitch Logs Download

This is a reference script for downloading Twitch log files from my server, and new scraped logs.
New day logs are available every night at midnight UTC.

This script will only download files that are not downloaded already, and I highly encourage any derivative script to do the same.

## Usage

```
yarn
yarn start
```

This will download logs from my domain (https://twitch-logs.johnpyp.com) to a folder called "twitch-logs" in the root.

## API reference

`/list-logs`

Response:
- `urlPrefix`: Prefix string for the urls of each path element in the `paths`
- `paths`: A list of paths to files on the server, not including the urlPrefix

```
# GET https://twitch-logs.johnpyp.com/list-logs
{
    error: false,
    data: {
        urlPrefix: "/scripts/",
        paths: [
            "/Destiny/2019-02-01.txt.gz",
            "/Destiny/2019-02-02.txt.gz",
            "/Destinygg/2019-02-01.txt.gz",
            "/Destinygg/2019-02-02.txt.gz",
            "/Destinygg/2019-02-03.txt.gz",
            ...
        ]
    }
}
```

`/list-logs/<channel>`

Parameters:
- channel: String of the channel you'd like to filter the logs results to

Response:
- `channel`: Same channel string as in parameters
- `urlPrefix`: Prefix string for the urls of each path element in the `paths`
- `paths`: A list of paths to files on the server, not including the urlPrefix

```
# GET https://twitch-logs.johnpyp.com/list-logs/Destiny
{
    error: false,
    data: {
        urlPrefix: "/scripts/",
        paths: [
            "/Destiny/2019-02-01.txt.gz",
            "/Destiny/2019-02-02.txt.gz",
            "/Destiny/2019-02-03.txt.gz",
            ...
        ]
    }
}
```

`/static/<path>`

Parameters:
- path: Path of the file provided by `/list-logs`

Response: File stream download of the target file, assuming it exists.


```
# GET https://twitch-logs.johnpyp.com/static/Destiny/2019-02-01.txt.gz

-- Raw Gzip body --
```
