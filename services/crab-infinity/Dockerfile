FROM python:3.11-slim

WORKDIR /app

# 시스템 의존성 설치
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# 백엔드 의존성 설치
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 소스 코드 및 프론트엔드 파일 복사
COPY backend/ ./backend/
COPY frontend/ ./frontend/

# 전체 프로젝트의 state와 services에 접근하기 위해 볼륨 마운트 지점 확보
# (docker-compose에서 설정)

EXPOSE 8000

CMD ["python", "backend/main.py"]
