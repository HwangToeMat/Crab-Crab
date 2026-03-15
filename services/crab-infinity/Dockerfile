# Use official Python image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy requirements and install
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy all files
COPY . .

# Set environment variables
ENV PYTHONPATH=/app/backend

# Expose port
EXPOSE 8000

# Start the application
CMD ["python", "backend/main.py"]
