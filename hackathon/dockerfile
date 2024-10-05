# Start from Python Alpine image
FROM python:3.9.13-alpine

# Update packages and install necessary tools
RUN apk update && apk add --no-cache bash busybox-suid openrc

# Install required Python packages
RUN pip install requests flask

# Add your Python script
ADD file.py /usr/local/bin/file.py

# Use exec form for CMD
CMD ["python3", "/usr/local/bin/file.py"]