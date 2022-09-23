import { useEffect, useRef, useState } from 'react';
import { Container } from './styles';

export default function Canvas() {
	const [x, setX] = useState(0);
	const [y, setY] = useState(0);

	let canvas = null;
	let ctx = null;
	let interval = null;

	useEffect(() => {
		canvas = document.getElementById('CanvasElement') as HTMLCanvasElement;
		ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
		console.log(x, y);
		ctx.fillRect(x, y, 10, 10);
	}, [x, y]);

	const eixoX = (quant: number) => {
		ctx.clearRect(x, y, 10, 10);
		setX(x + quant);
	};

	const eixoY = (quant: number) => {
		ctx.clearRect(x, y, 10, 10);
		setY((s) => s + quant);
	};

	const setDirection = (eixo: string, quant: number) => {
		interval = eixo === 'x'
			? setInterval(() => {
				eixoX(quant);
			}, 1000)
			: setInterval(() => {
				eixoY(quant);
			}, 1000);
	};

	return (
		<>
			<Container id="CanvasElement" />
			<button type="button" onClick={() => setDirection('x', 10)}>Right</button>
		</>
	);
}
