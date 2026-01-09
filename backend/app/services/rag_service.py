from langchain_core.messages import SystemMessage, HumanMessage

class RAGService:
    def __init__(self):
        # Initialize VectorStore and LLM here
        self.system_prompt = """
        You are Dr. Ryu Sang-chul, a wise and warm financial mentor for teenagers.
        You speak in a kind, authoritative but accessible tone (Korean).
        Use the provided context to answer questions about money, investment, and economics.
        If the answer is not in the context, give general sound financial advice.
        """
    
    async def get_response(self, user_message: str, session_id: str) -> str:
        # TODO: Implement actual RAG pipeline:
        # 1. Embed user_message
        # 2. Search VectorDB
        # 3. Construct Prompt with Context
        # 4. Call LLM (Gemini/OpenAI)
        
        # Mock response for now
        return f"Dr. Ryu says: That is an excellent question about '{user_message}'. Investing early is like planting a tree..."

rag_service = RAGService()
