import fs from "fs";

/**
 * Add subtitles to master.m3u8 playlist file
 */
export function addSubtitles() {
  if (fs.existsSync("./public/videos/output_vtt.m3u8")) {
    if (fs.readFileSync("./public/videos/master.m3u8", "utf8").split("\n").length <= 6) {
      fs.readFile("./public/videos/master.m3u8", "utf8", function (err, data) {
        if (err) return console.log(err);
        const lines = data.split("\n");
        lines[1] = lines[1] + '\n#EXT-X-MEDIA:TYPE=SUBTITLES,URI="output_vtt.m3u8",GROUP-ID="subs",LANGUAGE="en",NAME="English",AUTOSELECT=YES';
        lines[2] = lines[2] + ',SUBTITLES="subs"';
        const text = lines.join("\n");
        fs.writeFile("./public/videos/master.m3u8", text, function (err) {
          if (err) return console.log(err);
        });
      });
    }
  }
}
