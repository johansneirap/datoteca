import { Datoteca } from '@datoteca/cl';

const dl = new Datoteca({ seed: 123 });

dl.rut(); // "12345678-9"
dl.persona.nombreCompleto(); // "María González Soto"
dl.direccion.direccionCompleta(); // "Los Aromos 482, Providencia"
dl.telefono.movil(); // "+56 9 1234 5678"
dl.dinero.clp(); // "$45.000"
