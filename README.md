The project is currently hosted on github pages here:
https://sarath191181208.github.io/N-QueenReact/

# N Queen Problem Visualization

**N Queen using backtracking** is a popular in which you have to arrange the queens in a NxN grid without them attacking each other.
A more specific version of this problem called 8queens problem is given below:
[Eight Queens Wikipedia](https://en.wikipedia.org/wiki/Eight_queens_puzzle)

## Demo

![Image](https://github.com/Sarath191181208/N-QueenReact/blob/main/images/Screenshot.png)

## Description

I am using **functional components & react hooks** to handle the events from the user.
List of Hooks used:

- useState.
- useEffect.
- useCallback.
- useRef.

Learn About Hooks here:

- [React Docs](https://reactjs.org/docs/hooks-reference.html)
- [Ask your Friend Google😜](https://www.google.com/)

The Animation is done using [setTimeout](https://www.w3schools.com/jsref/met_win_settimeout.asp) in a recursive fashion for the animation. In every step of recursion we get the next step of the algorithm.
The algorithm is precomputed for extensibility and is stored in a [Linked list](https://www.geeksforgeeks.org/implementation-linkedlist-javascript/).
For every recursive call the Linked List is iterated thus showing the animation.

## References

- [N Queen Using Backtracking Geeks For Geeks](https://www.geeksforgeeks.org/n-queen-problem-backtracking-3/)

## Features

- A Clear button to totally clear the board.
- A Start button to start the visualization.
- Sliders to adjust animation time and the size of the Grid.

## Technologies

- [React](https://reactjs.org/)
- [Babel](https://babeljs.io/)
- [Fontawesome (icons)](https://fontawesome.com/)
- [Google fonts(font used: Fredoka)](https://fonts.google.com/specimen/Fredoka)
