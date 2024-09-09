import { Link } from 'react-router-dom';

const AboutMe = () => {
    return (
        <section id="features" className="border-b py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    {/* <span className="text-4xl font-bold text-gray-300">01</span> */}
                    <h3 className="text-3xl font-semibold mt-2">¿Quien es este personaje?</h3>
                </div>
                <div className="flex flex-wrap -mx-4">
                    <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
                        <img src="./images/about-1.jpg" alt="Mayo Ultimate player" className="w-full h-auto" />
                    </div>

                    <div className="w-full md:w-1/2 px-4">
                        <p className="text-l mb-6">Siempre he considerado que un blog es una herramienta fascinante, una paradoja en sí misma: egocéntrica en su naturaleza, pero con el potencial de ser generosa y altruista en sus fines. Es esta aparente contradicción la que, en mi opinión, refleja fielmente la complejidad de la experiencia humana.</p>

                        <p className="text-l mb-6">En mi caso particular, la motivación detrás de este espacio digital nace de la confluencia de dos grandes pasiones: el Ultimate Frisbee y el desarrollo web. Este blog se convierte así en el lienzo donde ambos mundos se entrelazan, creando una sinergia única.</p>

                        <p className="text-l mb-6">A ti, jugador que has llegado hasta aquí, te invito a sumergirte en estas páginas y acompañarme en mi tardío pero apasionante viaje deportivo. Embarcarse en la aventura de convertirse en un atleta "profesional" a los 40 años no es tarea sencilla. Sin embargo, aquí estoy, sobreviviendo entre risas y jadeos, superando frustraciones y dolores musculares. Si he logrado llegar hasta aquí, ha sido gracias a Dios y a las extraordinarias personas que he tenido la fortuna de conocer en este camino.</p>

                        <p className="text-l mb-6">No te sorprendas si encuentras tu nombre entre estas líneas. Cada partido, entrenamiento, sesión de movilidad, lanzamiento casual o cerveza compartida ha sido parte integral de este proceso. Todos estos momentos han tejido el tapiz perfecto para enamorarse perdidamente del Ultimate Frisbee.</p>

                        <p className="text-l mb-6">Así que relájate, respira hondo y, si lo deseas, disfruta de este espacio sincero y sin pretensiones. Ya sea que encuentres entretenimiento, inspiración o simplemente una sonrisa, eres completamente libre de experimentar este blog a tu manera. ¡Que lo disfrutes! O no, la elección es tuya.</p>
                        <ul className="mb-6 space-y-2">
                            <li><span className="font-semibold">Nombre:</span> Mayir Ramírez</li>
                            <li><span className="font-semibold">Fecha de nacimiento:</span> A una dama no se le pregunta la edad.</li>
                            <li><span className="font-semibold">Nacionalidad:</span> Colombia - España</li>
                        </ul>
                        <Link
                            to={'/search'}><a href="#" className="inline-block bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors">
                                Ir al blog
                            </a></Link>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;