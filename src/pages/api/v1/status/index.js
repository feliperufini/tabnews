function status(request, response) {
	response.status(200).json({ response: 'Servidor rodando!' })
}

export default status
