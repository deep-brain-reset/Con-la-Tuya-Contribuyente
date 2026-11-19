# Integración de patrimonio y justicia clara

Rama: feat/patrimonio-justicia-clara.

Se incorporan módulos reutilizables sin alterar vistas existentes.

- `src/lib/judicialExplicado.ts`: estados procesales y causales en lenguaje ciudadano. Para mostrar un caso real, se requiere resolución y estado verificados; el texto es orientativo.
- `src/lib/patrimonioComparador.ts`: compara activos menos pasivos entre dos DDJJ verificadas, y opcionalmente ajusta por índices de precios suministrados y documentados.

Pendiente: conectar módulos a RegistroPolitico, obtener DDJJ y fallos auténticos, validar UX, ejecutar tests y desplegar. No hay datos personales nuevos ni causas judiciales inventadas.
