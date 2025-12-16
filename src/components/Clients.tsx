export default function Clients() {
  const clientLogos = [
    { name: "Client 1", logo: "🏢" },
    { name: "Client 2", logo: "🏭" },
    { name: "Client 3", logo: "🏪" },
    { name: "Client 4", logo: "🏬" }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brown-800 mb-4">
            Clients We Worked With
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
          {clientLogos.map((client, index) => (
            <div key={index} className="text-center p-6 rounded-lg bg-brown-50 hover:bg-brown-100 transition-colors">
              <div className="text-4xl mb-2">{client.logo}</div>
              <p className="text-gray-600 text-sm">{client.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}