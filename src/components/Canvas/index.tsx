import { useEffect, useState } from 'react';
import { Container } from './styles';

export default function Canvas() {
	const [interval, setIntervalState] = useState(0);
	const [coorX, setCoorX] = useState(0);
	const [coorY, setCoorY] = useState(0);
	const [eixo, setEixo] = useState('');
	const [quant, setQuant] = useState(10);

	let canvas = null;
	let ctx: CanvasRenderingContext2D;

	const clear = () => {
		if (coorX === 300) {
			ctx?.clearRect(coorX - quant, coorY, 10, 10);
			ctx?.clearRect(coorX, coorY, 10, 10);
			setCoorX(0);
			return;
		}

		if (coorX === -10) {
			ctx?.clearRect(coorX - quant, coorY, 10, 10);
			ctx?.clearRect(coorX, coorY, 10, 10);
			setCoorX(290);
			return;
		}

		if (coorY === 150) {
			ctx?.clearRect(coorX, coorY - quant, 10, 10);
			ctx?.clearRect(coorX, coorY, 10, 10);
			setCoorY(0);
			return;
		}

		if (coorY === -10) {
			ctx?.clearRect(coorX, coorY - quant, 10, 10);
			ctx?.clearRect(coorX, coorY, 10, 10);
			setCoorY(140);
			return;
		}

		if (eixo === 'x') {
			ctx?.clearRect(coorX - quant, coorY, 10, 10);
		} else {
			ctx?.clearRect(coorX, coorY - quant, 10, 10);
		}
	};

	const setDirection = (newEixo: string, newQuant: number) => {
		if (!(eixo === newEixo)) {
			setEixo(newEixo);
			setQuant(newQuant);

			clearInterval(interval);

			setIntervalState(setInterval(() => {
				if (newEixo === 'x') {
					setCoorX((s) => s + newQuant);
				} else {
					setCoorY((s) => s + newQuant);
				}
			}, 200));
		}
	};

	const keyboardActions = (e: KeyboardEvent) => {
		if (e.key === 'ArrowRight') {
			setDirection('x', 10);
		}

		if (e.key === 'ArrowLeft') {
			setDirection('x', -10);
		}

		if (e.key === 'ArrowDown') {
			setDirection('y', 10);
		}

		if (e.key === 'ArrowUp') {
			setDirection('y', -10);
		}
	};

	useEffect(() => {
		canvas = document.getElementById('CanvasElement') as HTMLCanvasElement;
		ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
		ctx.fillRect(coorX, coorY, 10, 10);

		clear();
	}, [coorX, coorY, eixo]);

	useEffect(() => {
		window.addEventListener('keyup', keyboardActions);

		return () => {
			window.removeEventListener('keyup', keyboardActions);
		};
	}, []);

	return (
		<>
			<Container id="CanvasElement" />
			<button type="button" onClick={() => setDirection('x', -10)}>Left</button>
			<button type="button" onClick={() => setDirection('x', 10)}>Right</button>
			<button type="button" onClick={() => setDirection('y', 10)}>Down</button>
			<button type="button" onClick={() => setDirection('y', -10)}>Up</button>
		</>
	);
}
