FROM python:3.10-slim
WORKDIR /app
RUN pip install fastapi uvicorn
COPY . .
EXPOSE 8001
CMD ["python", "backend/main.py"]
