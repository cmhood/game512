/*
 * Copyright (c) 2024 Charles Hood <chood@chood.net>
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option) any later
 * version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
 * details.
 *
 * You should have received a copy of the GNU General Public License along with
 * this program. If not, see <https://www.gnu.org/licenses/>.
*/

// Initialize audio
a = new AudioContext();

// Shorthand for names used multiple times
h = setTimeout;
b = document.body;

// Set page style
b.style = "text-align:center;font:700 50vh/95vh Arial;margin:0";

// This function updates the screen and audio
// p = pitch (multiplied by 90 to get frequency in Hz)
u = p => {
	// Update audio
	o = a.createOscillator(l && l(b.style.color = (p - 6) ? 0 : f));
	o.type = "square";
	o.frequency.value = 60 * p;
	o.connect(a.destination);
	o.start(); // Play new sound
	h(l = x => o.stop(), 60);

	// Update text and background color. Text color gets updated in call to l()
	// above to save a byte that would otherwise be used for a semicolon.
	b.innerHTML = s;
	b.style.background = f = "#" + "fff04f8080".substr(c, 3);
};

// Keydown event handler
onkeydown = e => {
	// Get color number corresponding to key pressed.
	if (i = [51, 69, 52, 50, 81, 49, 87].indexOf(e.which) + 1) ( // If a valid key was pressed,
		++s, // Increment the player's score
		s *= (c == i), // Clear the score if the wrong key was pressed
		c = 0, // Clear the color
		u(s ? 6 : 1) // Update
	)
};

// Game tick function
// n = Random number in range 1..6 (or 1..7 if no current color)
t = x => {
	n = (Math.random() * (6 + !c) + 1) | 0;

	// Set new color according to the random number. If there is already a
	// color being displayed, avoid repeating it by adding 1 to values >=
	// the old color.
	c = n + (c && n >= c);

	// Update with pitch 3
	u(3);

	// Set a timeout to rerun this function. Use a shorter delay as s gets bigger.
	h(t, 1500 * (0.96 ** s));
};

// s = player score
// c = current color (1..7) or 0 for none (white)
// l = callback used to stop the currently-playing oscillator
t(s = c = l = 0);
