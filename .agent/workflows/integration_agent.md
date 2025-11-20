---
description: Full-stack integration and API connection workflow
---

# Integration Agent - Full-Stack Connector

## Purpose
Specialized in connecting frontend applications to backend APIs, managing state, and ensuring seamless end-to-end functionality.

## Skills
- API integration (fetch, axios)
- State management (Zustand)
- Authentication (Firebase Auth)
- Error handling and retry logic
- WebSocket/real-time updates
- Type safety (TypeScript interfaces)

## Workflow

### 1. Understand Integration Requirements
- Review user request for feature integration
- Identify frontend components needing data
- Identify backend endpoints providing data

### 2. API Contract Definition
- Define TypeScript interfaces for request/response
- Document endpoint URLs, methods, headers
- Create API client in `web/lib/api.ts` or `mobile/lib/api.ts`

### 3. Replace Mock Data
- Locate mock data generators (e.g., `web/lib/mockData.ts`)
- Create real API calls in `web/lib/api.ts`
- Update components to use real API calls

### 4. State Management
- Update Zustand stores in `web/lib/store.ts`
- Add loading states, error states
- Implement optimistic updates where applicable

### 5. Error Handling
- Add try-catch blocks for all API calls
- Display user-friendly error messages
- Implement retry logic for transient failures
- Log errors for debugging

### 6. Authentication Integration
- Ensure Firebase Auth tokens are attached to requests
- Handle token refresh
- Redirect to login on 401 errors

### 7. Testing
// turbo
Run frontend and backend:
```bash
# Terminal 1: Backend (if local)
cd backend/api/search_subscription && dart run main.dart

# Terminal 2: Frontend
cd web && npm run dev
```

### 8. End-to-End Verification
- Test happy path (success flow)
- Test error scenarios (network failure, invalid input)
- Test authentication flow (login, logout, token expiry)
- Verify loading states and UX

## Example: Connect Search Results

### 1. Define Interface
```typescript
// web/lib/types.ts
export interface FlightResult {
  id: number;
  airline: string;
  price: number;
  points: number;
  prediction: 'book' | 'wait';
}

export interface SearchResponse {
  results: FlightResult[];
  prediction: any;
}
```

### 2. Create API Client
```typescript
// web/lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function searchFlights(
  origin: string,
  destination: string,
  date: string
): Promise<SearchResponse> {
  const response = await fetch(
    `${API_BASE_URL}/search?route=${origin}-${destination}&date=${date}`
  );
  if (!response.ok) throw new Error('Search failed');
  return response.json();
}
```

### 3. Update Component
```typescript
// web/app/results/page.tsx
import { searchFlights } from '@/lib/api';

const [results, setResults] = useState<FlightResult[]>([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const fetchResults = async () => {
    setLoading(true);
    try {
      const data = await searchFlights(origin, destination, date);
      setResults(data.results);
    } catch (err) {
      setError('Failed to load results');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  fetchResults();
}, [origin, destination, date]);
```

## Best Practices
- **Environment Variables**: Use `.env.local` for API URLs
- **Type Safety**: Always define TypeScript interfaces
- **Error Boundaries**: Wrap components in error boundaries
- **Loading States**: Show skeletons, not blank screens
- **Caching**: Use SWR or React Query for data caching
