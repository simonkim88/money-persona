import os

file_path = ".env"

try:
    if not os.path.exists(file_path):
        print(f"Error: {file_path} does not exist.")
        exit(1)

    # Read binary to handle BOM
    with open(file_path, "rb") as f:
        content_bytes = f.read()

    # Decode using utf-8-sig which automatically handles BOM
    content = content_bytes.decode("utf-8-sig")

    # Just in case, strip any leading/trailing whitespace including BOM leftovers if any
    content = content.strip()

    # Write back as standard UTF-8 (no BOM)
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

    print("[OK] .env file has been successfully cleaned and saved as UTF-8 (No BOM).")
    print("Current content:")
    print("-" * 20)
    print(content)
    print("-" * 20)

except Exception as e:
    print(f"[ERROR] Error occurred: {e}")
