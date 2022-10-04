build:
	podman build -t eliseomartelli/homedotapp:$(shell git describe --tags) \
		-t eliseomartelli/homedotapp:latest .

push:
	podman push eliseomartelli/homedotapp:latest localhost:5000/eliseomartelli/homedotapp:latest
	podman push eliseomartelli/homedotapp:$(shell git describe --tags) localhost:5000/eliseomartelli/homedotapp:$(shell git describe --tags)
