'use client';
import CardSwap, { Card } from './CardSwap';
import { CodeWindow } from '../layout';

const CardSwapBox = () => (

  <div style={{ height: '600px', position: 'relative', left: '100px', bottom: '50px' }}>
    <CardSwap
      cardDistance={60}
      verticalDistance={70}
      delay={5000}
      pauseOnHover={false}
    >
      <Card sx={{ p: 0, m: 0 }}>
        <CodeWindow code={`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Aguat Solutions</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <section class="hero">
      <h1>Welcome to Aguat Solutions</h1>
    </section>
  </body>
</html>
`} />
      </Card>
      <Card sx={{ p: 0 }}>
        <CodeWindow language='javascript' code={`document.addEventListener('DOMContentLoaded', () => {
  const cta = document.querySelector('.cta');
  const footer = document.querySelector('footer');

  function scrollToContact() {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  }
});
`} />
      </Card>
      <Card >
        <CodeWindow language='css' code={`.hero {
  padding: 2rem;
  background: #f9f9f9;
  text-align: center;
}

.cta {
  padding: 0.5rem 1rem;
  background: #0070f3;
  color: white;
  border: none;
  border-radius: 6px;
}
`}/>
      </Card>
    </CardSwap>
  </div>
);

export default CardSwapBox;
