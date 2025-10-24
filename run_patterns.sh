#!/bin/bash

# Função para listar padrões em uma categoria
list_patterns() {
  local category=$1
  echo "Padrões de design na categoria '$category':"
  find "src/$category" -mindepth 1 -maxdepth 1 -type d | while read -r dir; do
    pattern_name=$(basename "$dir")
    echo "- $pattern_name"
  done
}

# Função para verificar se uma categoria é válida
is_valid_category() {
  local category=$1
  [ -d "src/$category" ]  # Retorna verdadeiro se o diretório existir
}

# Solicitar ao usuário para escolher uma categoria válida
while :; do
  echo "Escolha uma categoria de padrões de design:"
  echo "1. Creational"
  echo "2. Structural"
  echo "3. Behavioral"
  read -p "Digite o número da categoria (1-3): " category_choice

  case $category_choice in
    1)
      category="creational"
      ;;
    2)
      category="structural"
      ;;
    3)
      category="behavioral"
      ;;
    *)
      echo "Escolha inválida. Por favor, tente novamente."
      continue  # Reinicia o loop para uma nova escolha
      ;;
  esac

  # Se a categoria não existir, volte para a escolha
  if ! is_valid_category "$category"; then
    echo "Categoria '$category' não existe. Por favor, tente novamente."
    continue  # Reinicia o loop para uma nova escolha
  fi

  # Se a categoria for válida, saia do loop
  break
done

# Listar padrões na categoria escolhida
list_patterns "$category"

# Solicitar ao usuário para escolher um padrão para executar
read -p "Escolha um padrão para executar: " pattern_choice

# Executar o padrão escolhido usando nodemon
nodemon --exec "ts-node src/$category/$pattern_choice/index.ts"
