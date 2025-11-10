export default function Footer() {
  return (
    <div className="py-12 bg-primary text-primary-content">
      <div className="w-11/12 lg:w-4/5 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="text-4xl mb-4">🚚</div>
            <h4 className="text-xl font-bold mb-2">Envío Rápido</h4>
            <p className="text-primary-content/80">
              Recibe tus productos en 24-48 horas
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-4xl mb-4">🔒</div>
            <h4 className="text-xl font-bold mb-2">Pago Seguro</h4>
            <p className="text-primary-content/80">
              Transacciones protegidas y cifradas
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-4xl mb-4">⭐</div>
            <h4 className="text-xl font-bold mb-2">Calidad Garantizada</h4>
            <p className="text-primary-content/80">
              Productos verificados por nuestra comunidad
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
