.POSIX:

.PHONY: default clean

default:
	uglifyjs game.js -o game.min.js
	echo -n "<b><script>" >game.html
	head -c -1 game.min.js >>game.html
	echo -n "</script>" >>game.html
	wc -c game.html

clean:
	rm -f game.html game.min.js
