# Dokumen Desain Arsitektur: `genesis.js`

**Versi:** 0.2  
**Status:** Design Review - Ready for Implementation  
**Tanggal:** 4 Oktober 2025  
**Last Updated:** 4 Oktober 2025

---

## **Daftar Isi**

1. [Filosofi & Visi](#1-filosofi--visi)
2. [Arsitektur Tiga Pilar](#2-arsitektur-tiga-pilar)
3. [Desain Library `genesis.js`](#3-desain-library-genesisjs)
4. [State Management Architecture](#4-state-management-architecture)
5. [Renderer Abstraction Layer](#5-renderer-abstraction-layer)
6. [AI Orchestrator: Agent System](#6-ai-orchestrator-agent-system)
7. [Sandbox & Security Architecture](#7-sandbox--security-architecture)
8. [Alur Kerja Pengguna](#8-alur-kerja-pengguna)
9. [Non-Goals](#9-non-goals)
10. [Success Metrics](#10-success-metrics)
11. [Risk Assessment & Mitigation](#11-risk-assessment--mitigation)
12. [Struktur Proyek](#12-struktur-proyek)
13. [Peta Jalan](#13-peta-jalan)
14. [Stack Teknologi](#14-stack-teknologi)
15. [Appendix](#15-appendix)
16. [Conclusion & Next Steps](#16-conclusion-&-next-steps)
---

## **1. Filosofi & Visi**

### **1.1 Filosofi Inti**

**"Code as the Ultimate Creative Medium"**

Kami percaya bahwa representasi paling murni, fleksibel, dan kuat dari sebuah ide visual digital adalah kode yang menghasilkannya. Kode bersifat:
- **Deterministik**: Hasil yang sama dapat direproduksi dengan sempurna
- **Dapat Direvisi**: Setiap aspek dapat dimodifikasi dengan presisi
- **"Hidup"**: Dapat bereaksi, beranimasi, dan berinteraksi
- **Komposabel**: Dapat dikombinasikan dan digunakan kembali

### **1.2 Visi**

Menjadi **"Creative Compiler"** paling intuitif di dunia, yang mampu menerjemahkan ide dan percakapan manusia menjadi pengalaman digital yang interaktif dan dinamis secara *real-time*.

### **1.3 Prinsip Desain**

1. **Progressive Complexity**: Mudah untuk hal sederhana, fleksibel untuk hal kompleks
2. **AI-First**: Dirancang dari awal untuk generasi AI, bukan adaptasi tool manusia
3. **Fail-Safe**: Sistem harus bisa pulih dari error secara otomatis
4. **Visual Feedback Loop**: Setiap perubahan harus terlihat dalam <100ms
5. **Human-in-the-Loop**: AI sebagai kolaborator, bukan pengganti

---

## **2. Arsitektur Tiga Pilar**

GENESIS adalah sistem terintegrasi yang berdiri di atas tiga pilar fundamental:

```
┌─────────────────────────────────────────────────────────┐
│                    USER INTERFACE                        │
│            (Chat + Canvas + Code Inspector)              │
└────────────┬────────────────────────────┬────────────────┘
             │                            │
             ▼                            ▼
┌────────────────────────┐    ┌──────────────────────────┐
│   AI ORCHESTRATOR      │◄───┤   LIVE ENVIRONMENT       │
│                        │    │      (Sandbox)           │
│  ┌──────────────────┐  │    │                          │
│  │ Translator Agent │  │    │  ┌─────────────────┐    │
│  └──────────────────┘  │    │  │  Code Executor  │    │
│  ┌──────────────────┐  │    │  └─────────────────┘    │
│  │ Debugger Agent   │  │    │  ┌─────────────────┐    │
│  └──────────────────┘  │    │  │  Canvas Render  │    │
│  ┌──────────────────┐  │    │  └─────────────────┘    │
│  │ Optimizer Agent  │  │    │  ┌─────────────────┐    │
│  └──────────────────┘  │    │  │  Error Monitor  │    │
└────────────┬───────────┘    │  └─────────────────┘    │
             │                └──────────────────────────┘
             ▼
┌─────────────────────────────────────────────────────────┐
│                  CORE LIBRARY                            │
│                   (genesis.js)                           │
│                                                          │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐       │
│  │  Level 3   │  │  Level 2   │  │  Level 1   │       │
│  │ High-Level │  │  Mid-Level │  │ Low-Level  │       │
│  │    API     │  │    API     │  │    API     │       │
│  └────────────┘  └────────────┘  └────────────┘       │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │         Renderer Abstraction Layer               │  │
│  └──────────────────────────────────────────────────┘  │
│           │              │              │               │
│           ▼              ▼              ▼               │
│      ┌────────┐    ┌────────┐    ┌────────┐           │
│      │  p5.js │    │Two.js  │    │Three.js│           │
│      └────────┘    └────────┘    └────────┘           │
└─────────────────────────────────────────────────────────┘
```

### **2.1 Pilar 1: The Core Library (`genesis.js`)**

**Tujuan**: Menyediakan "bahasa" ekspresif untuk AI dalam membuat visual.

**Karakteristik Utama**:
- ✅ Renderer-agnostic dengan abstraction layer
- ✅ Multi-level API (Level 1-3)
- ✅ Built-in state management
- ✅ Immutable data structures untuk predictability
- ✅ Type-safe dengan TypeScript

### **2.2 Pilar 2: The AI Orchestrator**

**Tujuan**: Mengoordinasikan multiple AI agents untuk menghasilkan dan memperbaiki kode.

**Agent System**:
- **Translator Agent**: Natural language → Code
- **Debugger Agent**: Error detection & auto-fix
- **Optimizer Agent**: Performance & code quality improvements

### **2.3 Pilar 3: The Live Environment (Sandbox)**

**Tujuan**: Eksekusi kode yang aman dengan visual feedback real-time.

**Fitur Utama**:
- ✅ Isolated execution environment
- ✅ Real-time rendering (< 100ms latency)
- ✅ Error capturing & reporting
- ✅ Performance monitoring

---

## **3. Desain Library `genesis.js`**

### **3.1 Tingkat Abstraksi API**

#### **Level 3: High-Level API** (Bahasa Natural)

API yang sangat deskriptif, seolah berbicara dengan desainer.

```javascript
// ===== CONTOH 1: Business Card =====
buatKartuNama({
  nama: 'Anna Livia',
  jabatan: 'Lead Designer',
  perusahaan: 'QuantumLeap',
  email: 'anna@quantumleap.co',
  gaya: 'minimalis',
  paletWarna: 'pastel',
  layout: 'modern'
});

// ===== CONTOH 2: Logo Generator =====
buatLogo({
  namaPerusahaan: 'QuantumLeap',
  industri: 'teknologi',
  gaya: 'futuristik',
  bentukDasar: 'geometris',
  warna: ['#00F5FF', '#FF006E']
});

// ===== CONTOH 3: Data Visualization =====
buatGrafikBatang({
  data: [45, 67, 23, 89, 12],
  label: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  judul: 'Penjualan Q1 2025',
  warna: 'gradient-biru',
  animasi: 'fade-in'
});
```

**Karakteristik Level 3**:
- Satu fungsi = satu intent lengkap
- Banyak default intelligent
- Minimal parameter wajib
- Output siap pakai

---

#### **Level 2: Mid-Level API** (Scaffolding & Composition)

API untuk membangun dan mengkomposisi elemen.

```javascript
// ===== CONTOH 1: Custom Card Builder =====
const canvas = buatCanvas(850, 550);
const kartu = buatGrup({ 
  x: 0, 
  y: 0, 
  lebar: 850, 
  tinggi: 550,
  background: '#FFFFFF',
  borderRadius: 12
});

kartu.tambahTeks('Anna Livia', { 
  posisi: 'atas-tengah', 
  ukuranFont: 32,
  font: 'Inter-Bold',
  warna: '#1A1A1A',
  marginAtas: 60
});

kartu.tambahTeks('Lead Designer', { 
  posisi: 'tengah', 
  ukuranFont: 18,
  warna: '#666666'
});

kartu.tambahIkon('email', { 
  posisi: 'bawah-kiri',
  ukuran: 24,
  warna: '#0066FF',
  margin: 30
});

kartu.tambahGaris({
  dari: [100, 200],
  ke: [750, 200],
  ketebalan: 2,
  warna: '#EEEEEE'
});

canvas.render();

// ===== CONTOH 2: Layout System =====
const layout = buatLayout('grid', {
  kolom: 3,
  baris: 2,
  gap: 20,
  padding: 40
});

layout.tambahItem(buatKotak({ warna: '#FF6B6B' }), { baris: 0, kolom: 0 });
layout.tambahItem(buatLingkaran({ radius: 50 }), { baris: 0, kolom: 1 });
layout.tambahItem(buatTeks('Hello'), { baris: 1, kolom: 0, span: 2 });
```

**Karakteristik Level 2**:
- Kontrol granular atas komposisi
- Sistem positioning yang fleksibel
- Chainable methods
- Smart defaults tetap ada

---

#### **Level 1: Low-Level API** (Kontrol Penuh)

Akses langsung ke primitif renderer.

```javascript
// ===== Direct Renderer Access =====
const ctx = ambilRenderer();

// Setup
ctx.aturWarnaIsi('#FFFFFF');
ctx.aturWarnaGaris('#333333');
ctx.aturKetebalanGaris(2);

// Drawing primitives
ctx.buatPersegi(0, 0, 850, 550);
ctx.buatLingkaran(425, 275, 100);

// Text rendering
ctx.aturFont('Inter', 32, 'bold');
ctx.aturWarnaIsi('#1A1A1A');
ctx.aturAligmentTeks('center', 'middle');
ctx.gambarTeks('Anna Livia', 425, 100);

// Advanced: Transform matrix
ctx.simpanState();
ctx.translate(425, 275);
ctx.rotate(Math.PI / 4);
ctx.scale(1.5, 1.5);
ctx.buatPersegi(-50, -50, 100, 100);
ctx.muatState();

// Render
ctx.flush();
```

**Karakteristik Level 1**:
- Zero abstraction overhead
- Pixel-perfect control
- Performance critical operations
- Manual memory management

---

### **3.2 API Category Organization**

```typescript
// ===== SHAPES =====
namespace Bentuk {
  export function buatPersegi(x, y, lebar, tinggi, options?)
  export function buatLingkaran(x, y, radius, options?)
  export function buatSegitiga(p1, p2, p3, options?)
  export function buatPoligon(titik[], options?)
  export function buatJalanKustom(commands[], options?)
}

// ===== TEXT =====
namespace Teks {
  export function buatTeks(konten, x, y, options?)
  export function buatParagraf(konten, x, y, lebar, options?)
  export function buatTeksJalan(konten, jalan, options?)
  export function ukurTeks(konten, options?)
}

// ===== LAYOUT =====
namespace Layout {
  export function buatGrid(kolom, baris, options?)
  export function buatFlex(direction, options?)
  export function buatStack(items[], options?)
  export function buatFlow(items[], options?)
}

// ===== EFFECTS =====
namespace Efek {
  export function tambahBayangan(objek, options?)
  export function tambahGradient(objek, stops[], options?)
  export function tambahFilter(objek, filter, options?)
  export function tambahAnimasi(objek, animasi, options?)
}

// ===== INTERACTION =====
namespace Interaksi {
  export function onKlik(objek, handler)
  export function onHover(objek, handler)
  export function onDrag(objek, handler)
  export function buatButton(label, options?)
}

// ===== UTILITIES =====
namespace Utilitas {
  export function acakWarna()
  export function interpolasiWarna(dari, ke, t)
  export function hitungJarak(p1, p2)
  export function hitungSudut(p1, p2)
  export function clamp(nilai, min, max)
}
```

---

## **4. State Management Architecture**

### **4.1 Desain State System**

```typescript
// ===== Core State Interface =====
interface GenesisState {
  canvas: CanvasState;
  objects: ObjectRegistry;
  hierarchy: SceneGraph;
  animations: AnimationManager;
  history: HistoryManager;
}

interface CanvasState {
  width: number;
  height: number;
  backgroundColor: string;
  pixelRatio: number;
  transform: Transform;
}

interface ObjectRegistry {
  // Map dari ID ke object data
  data: Map<string, GenesisObject>;
  
  // Tambah objek baru
  add(obj: GenesisObject): string; // returns ID
  
  // Ambil objek by ID
  get(id: string): GenesisObject | undefined;
  
  // Update objek
  update(id: string, changes: Partial<GenesisObject>): void;
  
  // Hapus objek
  remove(id: string): void;
  
  // Query objek by criteria
  query(filter: ObjectFilter): GenesisObject[];
}

interface SceneGraph {
  root: SceneNode;
  
  // Tambah child ke parent
  addChild(parentId: string, childId: string): void;
  
  // Pindahkan node
  reparent(nodeId: string, newParentId: string): void;
  
  // Traverse tree
  traverse(visitor: (node: SceneNode) => void): void;
  
  // Get full path
  getPath(nodeId: string): string[];
}
```

### **4.2 Implementasi Contoh**

```javascript
// ===== Membuat State Global =====
const state = buatState({
  canvas: {
    width: 1920,
    height: 1080,
    backgroundColor: '#FFFFFF'
  }
});

// ===== Menambah Objek =====
const kartuId = state.objects.add({
  type: 'group',
  name: 'kartu-nama',
  x: 0,
  y: 0,
  width: 850,
  height: 550,
  style: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  }
});

const namaId = state.objects.add({
  type: 'text',
  name: 'nama',
  content: 'Anna Livia',
  x: 425,
  y: 100,
  style: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#1A1A1A',
    textAlign: 'center'
  }
});

// ===== Membuat Hierarki =====
state.hierarchy.addChild(kartuId, namaId);

// ===== Update Objek =====
state.objects.update(namaId, {
  style: { color: '#FF0000' }
});

// ===== Debugging: Serialize State =====
console.log(state.serialize());
// Output: JSON representation lengkap

// ===== Undo/Redo Support =====
state.history.snapshot(); // Save current state
state.objects.update(namaId, { content: 'New Name' });
state.history.undo(); // Restore previous state
```

### **4.3 Immutable Updates**

```typescript
// Menggunakan structural sharing untuk efisiensi
import { produce } from 'immer';

class StateManager {
  private state: GenesisState;
  private listeners: Set<StateListener>;
  
  update(updater: (draft: GenesisState) => void) {
    const newState = produce(this.state, updater);
    this.state = newState;
    this.notifyListeners();
  }
  
  subscribe(listener: StateListener): Unsubscribe {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}

// Usage
stateManager.update(draft => {
  draft.objects.data.get(namaId).style.color = '#00FF00';
});
```

---

## **5. Renderer Abstraction Layer**

### **5.1 Renderer Interface Contract**

```typescript
// ===== Core Renderer Interface =====
interface IRenderer {
  // ===== Setup & Configuration =====
  initialize(canvas: HTMLCanvasElement, options?: RendererOptions): void;
  resize(width: number, height: number): void;
  clear(): void;
  
  // ===== Drawing Primitives =====
  setFillColor(color: string): void;
  setStrokeColor(color: string): void;
  setStrokeWidth(width: number): void;
  
  drawRect(x: number, y: number, width: number, height: number): void;
  drawCircle(x: number, y: number, radius: number): void;
  drawLine(x1: number, y1: number, x2: number, y2: number): void;
  drawPolygon(points: Point[]): void;
  drawPath(commands: PathCommand[]): void;
  
  // ===== Text Rendering =====
  setFont(family: string, size: number, weight?: string): void;
  setTextAlign(horizontal: TextAlign, vertical?: TextBaseline): void;
  drawText(text: string, x: number, y: number): void;
  measureText(text: string): TextMetrics;
  
  // ===== Transform =====
  save(): void;
  restore(): void;
  translate(x: number, y: number): void;
  rotate(angle: number): void;
  scale(x: number, y: number): void;
  
  // ===== Advanced =====
  setGlobalAlpha(alpha: number): void;
  setBlendMode(mode: BlendMode): void;
  drawImage(image: ImageData, x: number, y: number, width?: number, height?: number): void;
  
  // ===== Lifecycle =====
  beginFrame(): void;
  endFrame(): void;
  flush(): void;
}
```

### **5.2 Adapter Implementations**

#### **P5.js Adapter**

```typescript
class P5Adapter implements IRenderer {
  private p5: p5;
  
  constructor(p5Instance: p5) {
    this.p5 = p5Instance;
  }
  
  initialize(canvas: HTMLCanvasElement, options?: RendererOptions): void {
    // P5.js handles this internally
  }
  
  setFillColor(color: string): void {
    this.p5.fill(color);
  }
  
  setStrokeColor(color: string): void {
    this.p5.stroke(color);
  }
  
  drawRect(x: number, y: number, width: number, height: number): void {
    this.p5.rect(x, y, width, height);
  }
  
  drawCircle(x: number, y: number, radius: number): void {
    this.p5.circle(x, y, radius * 2); // P5 uses diameter
  }
  
  setFont(family: string, size: number): void {
    this.p5.textFont(family);
    this.p5.textSize(size);
  }
  
  drawText(text: string, x: number, y: number): void {
    this.p5.text(text, x, y);
  }
  
  // ... implement all interface methods
}
```

#### **Canvas 2D Adapter**

```typescript
class Canvas2DAdapter implements IRenderer {
  private ctx: CanvasRenderingContext2D;
  
  constructor(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d')!;
  }
  
  setFillColor(color: string): void {
    this.ctx.fillStyle = color;
  }
  
  setStrokeColor(color: string): void {
    this.ctx.strokeStyle = color;
  }
  
  drawRect(x: number, y: number, width: number, height: number): void {
    this.ctx.fillRect(x, y, width, height);
    if (this.ctx.lineWidth > 0) {
      this.ctx.strokeRect(x, y, width, height);
    }
  }
  
  drawCircle(x: number, y: number, radius: number): void {
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.fill();
    if (this.ctx.lineWidth > 0) {
      this.ctx.stroke();
    }
  }
  
  // ... implement all interface methods
}
```

#### **Three.js Adapter** (3D Support - Future)

```typescript
class ThreeAdapter implements IRenderer {
  private scene: THREE.Scene;
  private camera: THREE.OrthographicCamera;
  private renderer: THREE.WebGLRenderer;
  
  // Implementasi untuk 3D primitives
  // drawRect akan menjadi Mesh dengan PlaneGeometry
  // drawCircle akan menjadi Mesh dengan CircleGeometry
  // dll.
}
```

### **5.3 Renderer Factory**

```typescript
type RendererType = 'p5' | 'canvas2d' | 'three' | 'svg';

class RendererFactory {
  static create(type: RendererType, target: HTMLElement): IRenderer {
    switch (type) {
      case 'p5':
        return new P5Adapter(new p5((p) => {
          p.setup = () => p.createCanvas(800, 600);
        }, target));
      
      case 'canvas2d':
        const canvas = document.createElement('canvas');
        target.appendChild(canvas);
        return new Canvas2DAdapter(canvas);
      
      case 'three':
        return new ThreeAdapter(target);
      
      case 'svg':
        return new SVGAdapter(target);
      
      default:
        throw new Error(`Unknown renderer type: ${type}`);
    }
  }
}

// Usage
const renderer = RendererFactory.create('p5', document.getElementById('canvas'));
```

---

## **6. AI Orchestrator: Agent System**

### **6.1 Translator Agent**

**Tanggung Jawab**: Menerjemahkan natural language menjadi kode `genesis.js`.

#### **Architecture**

```typescript
interface TranslatorAgent {
  translate(prompt: string, context: ConversationContext): Promise<GeneratedCode>;
  refine(code: string, feedback: string): Promise<GeneratedCode>;
}

interface GeneratedCode {
  code: string;
  level: 1 | 2 | 3; // API level yang digunakan
  confidence: number; // 0-1
  explanation: string;
  requiredImports: string[];
}

interface ConversationContext {
  history: Message[];
  currentState: GenesisState;
  userPreferences: UserPreferences;
}
```

#### **Prompt Engineering Strategy**

```typescript
class TranslatorAgentImpl implements TranslatorAgent {
  async translate(prompt: string, context: ConversationContext): Promise<GeneratedCode> {
    const systemPrompt = `
Kamu adalah expert code generator untuk library genesis.js.

ATURAN PENTING:
1. Selalu gunakan API level tertinggi yang memungkinkan (Level 3 > Level 2 > Level 1)
2. Kode harus self-contained dan dapat langsung dieksekusi
3. Gunakan nama variable yang deskriptif
4. Tambahkan komentar untuk logika yang kompleks
5. JANGAN menggunakan library eksternal yang tidak tersedia

AVAILABLE API LEVELS:

LEVEL 3 (Preferred):
${this.getLevel3Examples()}

LEVEL 2:
${this.getLevel2Examples()}

LEVEL 1 (Only for advanced needs):
${this.getLevel1Examples()}

CURRENT CANVAS STATE:
${JSON.stringify(context.currentState.canvas, null, 2)}

CONVERSATION HISTORY:
${this.formatHistory(context.history)}
    `;
    
    const userPrompt = `
User request: ${prompt}

Generate clean, executable genesis.js code that fulfills this request.
Return ONLY the code, no markdown formatting.
    `;
    
    const response = await this.llm.complete({
      system: systemPrompt,
      user: userPrompt,
      temperature: 0.3, // Lower for more consistent code
      maxTokens: 2000
    });
    
    return {
      code: response.code,
      level: this.detectAPILevel(response.code),
      confidence: response.confidence,
      explanation: response.explanation,
      requiredImports: this.extractImports(response.code)
    };
  }
  
  private getLevel3Examples(): string {
    return `
// Example 1: Business card
buatKartuNama({
  nama: 'John Doe',
  jabatan: 'CEO',
  gaya: 'minimalis'
});

// Example 2: Logo
buatLogo({
  namaPerusahaan: 'TechCorp',
  gaya: 'modern'
});
    `;
  }
  
  // ... more methods
}
```

#### **Intent Classification**

```typescript
enum PromptIntent {
  CREATE_NEW = 'create_new',
  MODIFY_EXISTING = 'modify_existing',
  STYLE_CHANGE = 'style_change',
  LAYOUT_ADJUSTMENT = 'layout_adjustment',
  ADD_ELEMENT = 'add_element',
  REMOVE_ELEMENT = 'remove_element',
  ANIMATE = 'animate',
  EXPORT = 'export'
}

class IntentClassifier {
  classify(prompt: string): PromptIntent {
    const keywords = {
      [PromptIntent.CREATE_NEW]: ['buat', 'buatkan', 'create', 'generate', 'new'],
      [PromptIntent.MODIFY_EXISTING]: ['ubah', 'ganti', 'change', 'modify', 'update'],
      [PromptIntent.STYLE_CHANGE]: ['warna', 'color', 'font', 'ukuran', 'style'],
      [PromptIntent.ADD_ELEMENT]: ['tambah', 'add', 'insert', 'include'],
      [PromptIntent.REMOVE_ELEMENT]: ['hapus', 'remove', 'delete', 'buang'],
      [PromptIntent.ANIMATE]: ['animasi', 'animate', 'bergerak', 'motion'],
    };
    
    // Simple keyword matching (dapat diperbaiki dengan ML model)
    for (const [intent, words] of Object.entries(keywords)) {
      if (words.some(word => prompt.toLowerCase().includes(word))) {
        return intent as PromptIntent;
      }
    }
    
    return PromptIntent.CREATE_NEW;
  }
}
```

---

### **6.2 Debugger Agent**

**Tanggung Jawab**: Mendeteksi dan memperbaiki error secara otomatis.

#### **Error Classification**

```typescript
enum ErrorCategory {
  SYNTAX_ERROR = 'syntax',
  RUNTIME_ERROR = 'runtime',
  LOGIC_ERROR = 'logic',
  API_MISUSE = 'api_misuse',
  PERFORMANCE_ISSUE = 'performance'
}

interface ErrorAnalysis {
  category: ErrorCategory;
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  stackTrace: string;
  suggestedFix: string | null;
  autoFixable: boolean;
}
```

#### **Rule-Based Fixes**

```typescript
class DebuggerAgent {
  private fixRules: Map<RegExp, FixRule>;
  
  constructor() {
    this.fixRules = new Map([
      // Rule 1: Undefined function
      [
        /(\w+) is not a function/,
        {
          analyze: (error, code) => {
            const funcName = error.match[1];
            return {
              issue: `Function '${funcName}' tidak ditemukan`,
              possibleCauses: [
                'Typo dalam nama fungsi',
                'Fungsi belum diimport',
                'Fungsi tidak ada di API'
              ],
              fix: this.suggestSimilarFunction(funcName)
            };
          },
          autoFix: (code, error) => {
            // Coba perbaiki typo dengan fuzzy matching
            const funcName = error.match[1];
            const similar = this.findSimilarFunction(funcName);
            return code.replace(new RegExp(funcName, 'g'), similar);
          }
        }
      ],
      
      // Rule 2: Undefined variable
      [
        /(\w+) is not defined/,
        {
          analyze: (error, code) => {
            const varName = error.match[1];
            return {
              issue: `Variable '${varName}' tidak ditemukan`,
              fix: `Tambahkan deklarasi: const ${varName} = ...`
            };
          },
          autoFix: null // Tidak bisa auto-fix, butuh context
        }
      ],
      
      // Rule 3: Type Error - null/undefined access
      [
        /Cannot read property '(\w+)' of (null|undefined)/,
        {
          analyze: (error, code) => {
            const prop = error.match[1];
            const nullType = error.match[2];
            return {
              issue: `Mencoba mengakses property '${prop}' dari object ${nullType}`,
              possibleCauses: [
                'Object belum diinisialisasi',
                'Fungsi mengembalikan undefined',
                'ID object tidak valid'
              ],
              fix: 'Tambahkan null check atau inisialisasi object'
            };
          },
          autoFix: (code, error) => {
            // Tambahkan optional chaining
            const lines = code.split('\n');
            const errorLine = this.findErrorLine(lines, error);
            lines[errorLine] = lines[errorLine].replace(
              /(\w+)\.(\w+)/g,
              '$1?.$2'
            );
            return lines.join('\n');
          }
        }
      ],
      
      // Rule 4: Maximum call stack exceeded (infinite recursion)
      [
        /Maximum call stack size exceeded/,
        {
          analyze: (error, code) => {
            const recursiveFunctions = this.detectRecursion(code);
            return {
              issue: 'Infinite recursion detected',
              possibleCauses: recursiveFunctions,
              fix: 'Tambahkan base case atau guard condition'
            };
          },
          autoFix: null // Too complex for auto-fix
        }
      ],
      
      // Rule 5: Invalid color format
      [
        /Invalid color value/,
        {
          analyze: (error, code) => {
            return {
              issue: 'Format warna tidak valid',
              fix: 'Gunakan format: "#RRGGBB", "rgb(r,g,b)", atau nama warna CSS'
            };
          },
          autoFix: (code, error) => {
            // Coba perbaiki format warna yang salah
            return code.replace(
              /['"](\d{3})['"]/g, // '123' -> '#112233'
              (match, rgb) => `"#${rgb[0]}${rgb[0]}${rgb[1]}${rgb[1]}${rgb[2]}${rgb[2]}"`
            );
          }
        }
      ]
    ]);
  }
  
  async diagnose(error: Error, code: string, context: ExecutionContext): Promise<ErrorAnalysis> {
    // Cari rule yang cocok
    for (const [pattern, rule] of this.fixRules) {
      const match = error.message.match(pattern);
      if (match) {
        const analysis = rule.analyze({ ...error, match }, code);
        const autoFix = rule.autoFix ? rule.autoFix(code, { ...error, match }) : null;
        
        return {
          category: this.categorizeError(error),
          severity: this.calculateSeverity(error, context),
          message: analysis.issue,
          stackTrace: error.stack || '',
          suggestedFix: analysis.fix,
          autoFixable: autoFix !== null
        };
      }
    }
    
    // Jika tidak ada rule yang cocok, gunakan LLM
    return this.llmBasedDiagnosis(error, code, context);
  }
  
  private async llmBasedDiagnosis(
    error: Error, 
    code: string, 
    context: ExecutionContext
  ): Promise<ErrorAnalysis> {
    const prompt = `
Analyze this JavaScript error and suggest a fix:

ERROR MESSAGE:
${error.message}

STACK TRACE:
${error.stack}

CODE:
\`\`\`javascript
${code}
\`\`\`

CONTEXT:
- Canvas Size: ${context.canvasWidth}x${context.canvasHeight}
- Objects on Canvas: ${context.objectCount}
- Current State: ${JSON.stringify(context.state, null, 2)}

Please provide:
1. Root cause analysis
2. Specific fix suggestion
3. Whether this is auto-fixable (yes/no)
4. Corrected code if auto-fixable
    `;
    
    const response = await this.llm.complete({
      system: 'You are an expert JavaScript debugger for the genesis.js library.',
      user: prompt,
      temperature: 0.2
    });
    
    return {
      category: ErrorCategory.RUNTIME_ERROR,
      severity: 'high',
      message: response.rootCause,
      stackTrace: error.stack || '',
      suggestedFix: response.fix,
      autoFixable: response.autoFixable === 'yes'
    };
  }
  
  async autoFix(code: string, error: Error): Promise<string | null> {
    // Coba rule-based fix dulu
    for (const [pattern, rule] of this.fixRules) {
      if (error.message.match(pattern) && rule.autoFix) {
        const match = error.message.match(pattern);
        return rule.autoFix(code, { ...error, match });
      }
    }
    
    // Fallback ke LLM-based fix
    const prompt = `
Fix this code that produces an error:

ERROR:
${error.message}

CODE:
\`\`\`javascript
${code}
\`\`\`

Return ONLY the corrected code, no explanation.
Make MINIMAL changes necessary to fix the error.
    `;
    
    const response = await this.llm.complete({
      system: 'You are a code fixing expert. Return only corrected code.',
      user: prompt,
      temperature: 0.1
    });
    
    return response.code;
  }
  
  private findSimilarFunction(funcName: string): string {
    // Implementasi Levenshtein distance untuk fuzzy matching
    const availableFunctions = [
      'buatPersegi', 'buatLingkaran', 'buatSegitiga',
      'buatTeks', 'buatGrup', 'buatKartuNama', 'buatLogo'
    ];
    
    let closest = availableFunctions[0];
    let minDistance = this.levenshteinDistance(funcName, closest);
    
    for (const func of availableFunctions) {
      const distance = this.levenshteinDistance(funcName, func);
      if (distance < minDistance) {
        minDistance = distance;
        closest = func;
      }
    }
    
    return closest;
  }
  
  private levenshteinDistance(str1: string, str2: string): number {
    const matrix: number[][] = [];
    
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    
    return matrix[str2.length][str1.length];
  }
  
  private detectRecursion(code: string): string[] {
    // Simple AST-based recursion detection
    const functionCalls = new Map<string, Set<string>>();
    
    // Parse code untuk menemukan function calls
    // (Simplified - gunakan proper AST parser seperti @babel/parser)
    const funcRegex = /function\s+(\w+)|const\s+(\w+)\s*=\s*\(.*?\)\s*=>/g;
    const callRegex = /(\w+)\(/g;
    
    // ... implementasi detection logic
    
    return ['functionName']; // placeholder
  }
}
```

---

### **6.3 Optimizer Agent**

**Tanggung Jawab**: Mengoptimalkan kode untuk performa dan kualitas.

```typescript
interface OptimizationSuggestion {
  type: 'performance' | 'readability' | 'best-practice';
  severity: 'info' | 'warning';
  message: string;
  before: string;
  after: string;
  estimatedImprovement?: string;
}

class OptimizerAgent {
  async analyze(code: string, metrics: PerformanceMetrics): Promise<OptimizationSuggestion[]> {
    const suggestions: OptimizationSuggestion[] = [];
    
    // Check 1: Redundant draw calls
    if (this.hasRedundantDrawCalls(code)) {
      suggestions.push({
        type: 'performance',
        severity: 'warning',
        message: 'Multiple draw calls dapat digabungkan',
        before: this.extractRedundantCalls(code),
        after: this.optimizeDrawCalls(code),
        estimatedImprovement: '30% faster rendering'
      });
    }
    
    // Check 2: Missing object pooling
    if (this.shouldUseObjectPooling(code, metrics)) {
      suggestions.push({
        type: 'performance',
        severity: 'warning',
        message: 'Gunakan object pooling untuk objek yang sering dibuat/dihapus',
        before: 'const circle = buatLingkaran(x, y, r);',
        after: 'const circle = objectPool.get("circle").reset(x, y, r);'
      });
    }
    
    // Check 3: Inefficient loops
    if (this.hasInefficientLoops(code)) {
      suggestions.push({
        type: 'performance',
        severity: 'info',
        message: 'Loop dapat dioptimalkan',
        before: this.extractInefficientLoop(code),
        after: this.optimizeLoop(code)
      });
    }
    
    // Check 4: Code style improvements
    const styleIssues = this.checkCodeStyle(code);
    suggestions.push(...styleIssues);
    
    return suggestions;
  }
  
  async autoOptimize(code: string): Promise<string> {
    let optimizedCode = code;
    
    // Apply safe optimizations
    optimizedCode = this.removeUnusedVariables(optimizedCode);
    optimizedCode = this.consolidateDrawCalls(optimizedCode);
    optimizedCode = this.improveNaming(optimizedCode);
    
    return optimizedCode;
  }
  
  private hasRedundantDrawCalls(code: string): boolean {
    // Detect multiple setFillColor followed by single draw
    const pattern = /(setFillColor|aturWarnaIsi)\([^)]+\);\s*(setFillColor|aturWarnaIsi)\([^)]+\);/;
    return pattern.test(code);
  }
  
  private shouldUseObjectPooling(code: string, metrics: PerformanceMetrics): boolean {
    // Jika ada loop yang membuat banyak objek
    return metrics.objectCreationsPerFrame > 100;
  }
  
  private checkCodeStyle(code: string): OptimizationSuggestion[] {
    const suggestions: OptimizationSuggestion[] = [];
    
    // Check untuk magic numbers
    const magicNumberRegex = /(?<!const\s+\w+\s*=\s*)\b(\d{3,})\b/g;
    if (magicNumberRegex.test(code)) {
      suggestions.push({
        type: 'readability',
        severity: 'info',
        message: 'Gunakan konstanta untuk magic numbers',
        before: 'buatPersegi(100, 200, 850, 550);',
        after: 'const CARD_WIDTH = 850;\nconst CARD_HEIGHT = 550;\nbuatPersegi(100, 200, CARD_WIDTH, CARD_HEIGHT);'
      });
    }
    
    return suggestions;
  }
}
```

---

## **7. Sandbox & Security Architecture**

### **7.1 Security Requirements**

**Threats to Mitigate**:
1. Arbitrary code execution
2. Access to user data
3. Network requests to external services
4. DOM manipulation outside sandbox
5. Infinite loops causing browser hang

### **7.2 Sandbox Implementation Strategy**

**Pilihan yang Direkomendasikan: Web Worker + iframe Hybrid**

```typescript
// ===== Sandbox Manager =====
class SandboxManager {
  private worker: Worker | null = null;
  private iframe: HTMLIFrameElement | null = null;
  private executionMode: 'worker' | 'iframe';
  
  constructor(mode: 'worker' | 'iframe' = 'worker') {
    this.executionMode = mode;
  }
  
  async execute(code: string, timeout: number = 5000): Promise<ExecutionResult> {
    if (this.executionMode === 'worker') {
      return this.executeInWorker(code, timeout);
    } else {
      return this.executeInIframe(code, timeout);
    }
  }
  
  private async executeInWorker(code: string, timeout: number): Promise<ExecutionResult> {
    return new Promise((resolve, reject) => {
      // Create isolated worker
      this.worker = new Worker('/sandbox-worker.js');
      
      const timeoutId = setTimeout(() => {
        this.worker?.terminate();
        reject(new Error('Execution timeout'));
      }, timeout);
      
      this.worker.onmessage = (event) => {
        clearTimeout(timeoutId);
        
        if (event.data.type === 'success') {
          resolve({
            success: true,
            output: event.data.output,
            logs: event.data.logs,
            errors: []
          });
        } else {
          resolve({
            success: false,
            output: null,
            logs: event.data.logs,
            errors: [event.data.error]
          });
        }
        
        this.worker?.terminate();
      };
      
      this.worker.onerror = (error) => {
        clearTimeout(timeoutId);
        resolve({
          success: false,
          output: null,
          logs: [],
          errors: [error.message]
        });
        this.worker?.terminate();
      };
      
      // Send code to worker
      this.worker.postMessage({
        code: this.wrapCode(code),
        context: this.getExecutionContext()
      });
    });
  }
  
  private wrapCode(code: string): string {
    return `
      // Sandbox wrapper
      (function() {
        'use strict';
        
        // Disable dangerous globals
        const window = undefined;
        const document = undefined;
        const localStorage = undefined;
        const sessionStorage = undefined;
        const fetch = undefined;
        const XMLHttpRequest = undefined;
        
        // Capture console output
        const logs = [];
        const console = {
          log: (...args) => logs.push({ type: 'log', args }),
          warn: (...args) => logs.push({ type: 'warn', args }),
          error: (...args) => logs.push({ type: 'error', args })
        };
        
        // Import genesis.js API
        ${this.getGenesisAPICode()}
        
        try {
          // User code
          ${code}
          
          // Return result
          return {
            success: true,
            logs: logs,
            state: getState()
          };
        } catch (error) {
          return {
            success: false,
            logs: logs,
            error: {
              message: error.message,
              stack: error.stack,
              name: error.name
            }
          };
        }
      })();
    `;
  }
  
  private async executeInIframe(code: string, timeout: number): Promise<ExecutionResult> {
    return new Promise((resolve) => {
      // Create sandboxed iframe
      this.iframe = document.createElement('iframe');
      this.iframe.setAttribute('sandbox', 'allow-scripts');
      this.iframe.style.display = 'none';
      document.body.appendChild(this.iframe);
      
      const timeoutId = setTimeout(() => {
        this.cleanup();
        resolve({
          success: false,
          output: null,
          logs: [],
          errors: ['Execution timeout']
        });
      }, timeout);
      
      // Setup message listener
      const messageHandler = (event: MessageEvent) => {
        if (event.source === this.iframe?.contentWindow) {
          clearTimeout(timeoutId);
          window.removeEventListener('message', messageHandler);
          
          resolve(event.data);
          this.cleanup();
        }
      };
      
      window.addEventListener('message', messageHandler);
      
      // Inject code into iframe
      const iframeDocument = this.iframe.contentDocument!;
      iframeDocument.open();
      iframeDocument.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <script src="/genesis.min.js"></script>
        </head>
        <body>
          <canvas id="canvas"></canvas>
          <script>
            try {
              ${code}
              
              parent.postMessage({
                success: true,
                output: canvas.toDataURL(),
                logs: window.__logs || [],
                errors: []
              }, '*');
            } catch (error) {
              parent.postMessage({
                success: false,
                output: null,
                logs: window.__logs || [],
                errors: [error.message]
              }, '*');
            }
          </script>
        </body>
        </html>
      `);
      iframeDocument.close();
    });
  }
  
  private cleanup() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
    
    if (this.iframe) {
      this.iframe.remove();
      this.iframe = null;
    }
  }
  
  private getGenesisAPICode(): string {
    // Return minified genesis.js library code
    return `/* genesis.js minified code */`;
  }
  
  private getExecutionContext(): ExecutionContext {
    return {
      canvasWidth: 1920,
      canvasHeight: 1080,
      pixelRatio: window.devicePixelRatio,
      timestamp: Date.now()
    };
  }
}
```

### **7.3 Content Security Policy**

```typescript
// CSP Headers untuk additional security
const CSP_POLICY = {
  'default-src': ["'self'"],
  'script-src': ["'self'", "'unsafe-eval'"], // unsafe-eval needed for dynamic code
  'style-src': ["'self'", "'unsafe-inline'"],
  'img-src': ["'self'", 'data:', 'blob:'],
  'connect-src': ["'self'", 'https://api.anthropic.com'], // LLM API
  'frame-src': ["'none'"],
  'object-src': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"]
};

function generateCSPHeader(): string {
  return Object.entries(CSP_POLICY)
    .map(([key, values]) => `${key} ${values.join(' ')}`)
    .join('; ');
}
```

### **7.4 Rate Limiting & Resource Control**

```typescript
class ResourceController {
  private executionCount = 0;
  private lastResetTime = Date.now();
  private readonly MAX_EXECUTIONS_PER_MINUTE = 30;
  private readonly MAX_CODE_SIZE_BYTES = 100_000; // 100KB
  private readonly MAX_MEMORY_MB = 50;
  
  canExecute(code: string): { allowed: boolean; reason?: string } {
    // Reset counter setiap menit
    if (Date.now() - this.lastResetTime > 60000) {
      this.executionCount = 0;
      this.lastResetTime = Date.now();
    }
    
    // Check rate limit
    if (this.executionCount >= this.MAX_EXECUTIONS_PER_MINUTE) {
      return {
        allowed: false,
        reason: 'Rate limit exceeded. Please wait a moment.'
      };
    }
    
    // Check code size
    const codeSize = new Blob([code]).size;
    if (codeSize > this.MAX_CODE_SIZE_BYTES) {
      return {
        allowed: false,
        reason: `Code too large (${codeSize} bytes). Maximum is ${this.MAX_CODE_SIZE_BYTES} bytes.`
      };
    }
    
    // Check untuk suspicious patterns
    if (this.hasSuspiciousPatterns(code)) {
      return {
        allowed: false,
        reason: 'Code contains potentially dangerous patterns.'
      };
    }
    
    this.executionCount++;
    return { allowed: true };
  }
  
  private hasSuspiciousPatterns(code: string): boolean {
    const dangerousPatterns = [
      /eval\s*\(/,
      /Function\s*\(/,
      /localStorage/,
      /sessionStorage/,
      /document\.cookie/,
      /XMLHttpRequest/,
      /fetch\s*\(/,
      /import\s*\(/,
      /require\s*\(/,
      /process\.env/,
      /__proto__/,
      /constructor\[/
    ];
    
    return dangerousPatterns.some(pattern => pattern.test(code));
  }
}
```

---

## **8. Alur Kerja Pengguna**

### **8.1 User Flow Diagram**

```
┌─────────────────────────────────────────────────────────────┐
│                         USER                                 │
└────────────┬────────────────────────────────────────────────┘
             │
             │ 1. Types prompt
             ▼
┌────────────────────────────────────────────────────────────┐
│                   UI: Chat Interface                        │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ > "Buat kartu nama untuk Anna Livia, desainer"      │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────┬───────────────────────────────────────────────┘
             │ 2. Send to Orchestrator
             ▼
┌────────────────────────────────────────────────────────────┐
│              AI Orchestrator                                │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Translator Agent                                    │   │
│  │  • Parse intent                                      │   │
│  │  • Generate genesis.js code                          │   │
│  └─────────────────────────────────────────────────────┘   │
└────────────┬───────────────────────────────────────────────┘
             │ 3. Generated code
             ▼
┌────────────────────────────────────────────────────────────┐
│                  Sandbox                                    │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Execute code in isolation                           │   │
│  └─────────────────────────────────────────────────────┘   │
└────────────┬───────────────┬──────────────────────────────┘
             │               │
             │ 4a. Success   │ 4b. Error
             ▼               ▼
     ┌───────────┐   ┌──────────────┐
     │  Canvas   │   │ Error Monitor│
     │  Render   │   └──────┬───────┘
     └─────┬─────┘          │
           │                │ 5. Send error to Debugger
           │                ▼
           │        ┌──────────────────┐
           │        │ Debugger Agent   │
           │        │ • Analyze error  │
           │        │ • Auto-fix code  │
           │        └────────┬─────────┘
           │                 │
           │                 │ 6. Retry execution
           │                 ▼
           │        [Back to Sandbox]
           │
           │ 7. Display result
           ▼
┌────────────────────────────────────────────────────────────┐
│                   UI: Canvas + Code View                    │
│  ┌──────────────────┐  ┌──────────────────────────────┐   │
│  │                  │  │  Code Inspector              │   │
│  │     [Canvas]     │  │  ```javascript               │   │
│  │                  │  │  buatKartuNama({             │   │
│  │  [Visual Output] │  │    nama: 'Anna Livia',       │   │
│  │                  │  │    jabatan: 'Lead Designer', │   │
│  │                  │  │    gaya: 'minimalis'         │   │
│  │                  │  │  });                         │   │
│  └──────────────────┘  │  ```                         │   │
│                        └──────────────────────────────┘   │
└────────────────────────────────────────────────────────────┘
             │
             │ 8. User iterates
             ▼
     "Ubah warnanya jadi biru"
             │
             └──[Back to step 1]
```

### **8.2 Interaction Patterns**

#### **Pattern 1: Simple Creation**

```
User: "Buat logo untuk perusahaan TechStart"

AI: [Generates]
buatLogo({
  namaPerusahaan: 'TechStart',
  industri: 'teknologi',
  gaya: 'modern'
});

Result: Logo appears on canvas
```

#### **Pattern 2: Iterative Refinement**

```
User: "Buat kartu nama"
AI: [Generates basic business card]

User: "Tambahkan icon email di kiri bawah"
AI: [Modifies existing code to add icon]

User: "Warna background terlalu terang, buat lebih gelap"
AI: [Updates backgroundColor property]

User: "Perfect! Save this"
System: [Exports code + image]
```

#### **Pattern 3: Error Recovery**

```
User: "Buat lingkaran dengan radius 1000"
AI: [Generates code]
Sandbox: ERROR - Circle exceeds canvas bounds

Debugger Agent: [Analyzes]
- Issue: Radius too large for canvas
- Auto-fix: Clamp radius to max(canvasWidth, canvasHeight) / 2

AI: [Regenerates with radius: 500]
Result: Circle rendered successfully
```

#### **Pattern 4: Complex Composition**

```
User: "Buat dashboard dengan 3 grafik dan header"

AI: [Generates]
const dashboard = buatLayout('grid', {
  kolom: 2,
  baris: 2
});

dashboard.tambahHeader('Sales Dashboard', {
  span: 2
});

dashboard.tambahItem(
  buatGrafikGaris({ data: salesData }),
  { baris: 1, kolom: 0 }
);

dashboard.tambahItem(
  buatGrafikBatang({ data: revenueData }),
  { baris: 1, kolom: 1 }
);

Result: Full dashboard rendered
```

---

## **9. Non-Goals**

Untuk menjaga fokus dan realisme scope v0.1, berikut adalah hal-hal yang **BUKAN** tujuan GENESIS saat ini:

### **9.1 Diluar Scope v0.1**

❌ **Bukan Editor Visual WYSIWYG Tradisional**
- Tidak ada drag-and-drop interface
- Tidak ada direct manipulation seperti Figma/Canva
- Fokus pada conversational interface

❌ **Bukan Replacement untuk Professional Design Tools**
- Tidak menggantikan Figma untuk design system
- Tidak menggantikan Adobe Illustrator untuk artwork detail
- Target: Rapid prototyping & creative exploration

❌ **Bukan General-Purpose Programming IDE**
- Tidak ada features seperti debugging breakpoints
- Tidak ada full-featured code editor
- Code view adalah read-only untuk inspeksi

❌ **Bukan Static Image Generator**
- Fokus pada interactive & animated graphics
- Bukan competitor untuk DALL-E/Midjourney
- Output adalah "living code", bukan PNG/JPG

❌ **Bukan Collaborative Editing Tool** (yet)
- Single-user experience untuk v0.1
- Tidak ada real-time collaboration
- No version control integration

### **9.2 Future Considerations** (Post v1.0)

✅ Possible in future:
- Export ke Figma/Sketch format
- Collaborative editing dengan WebRTC
- AI-powered design system generation
- Integration dengan design tokens
- Mobile app version
- Plugin system untuk extensibility

---

## **10. Success Metrics**

### **10.1 Technical Metrics**

#### **Code Generation Quality**
```typescript
interface CodeQualityMetrics {
  // Berapa persen prompt menghasilkan kode valid?
  validCodeRate: number; // Target: > 90%
  
  // Berapa persen kode berjalan tanpa error?
  executionSuccessRate: number; // Target: > 85%
  
  // Berapa banyak iterasi debug rata-rata?
  averageDebugIterations: number; // Target: < 1.5
  
  // Berapa persen error bisa di-autofix?
  autoFixSuccessRate: number; // Target: > 70%
}
```

#### **Performance Metrics**
```typescript
interface PerformanceMetrics {
  // Time from prompt to first visual
  timeToFirstRender: number; // Target: < 3s
  
  // Render frame rate
  fps: number; // Target: > 30fps
  
  // Code execution time
  executionTime: number; // Target: < 100ms untuk simple graphics
  
  // Memory usage
  memoryUsageMB: number; // Target: < 50MB per session
}
```

#### **Reliability Metrics**
```typescript
interface ReliabilityMetrics {
  // Uptime
  availability: number; // Target: > 99%
  
  // Crash rate
  crashRate: number; // Target: < 1%
  
  // Error recovery rate
  errorRecoveryRate: number; // Target: > 80%
}
```

### **10.2 User Experience Metrics**

```typescript
interface UXMetrics {
  // Task completion
  taskCompletionRate: number; // Target: > 80%
  
  // Time to create first design
  timeToFirstDesign: number; // Target: < 2 minutes
  
  // Time per iteration
  iterationTime: number; // Target: < 30 seconds
  
  // User satisfaction
  nps: number; // Target: > 50
  
  // Feature adoption
  featureUsageRate: Map<string, number>;
}
```

### **10.3 Measurement Strategy**

```typescript
class MetricsCollector {
  private metrics: Map<string, number[]> = new Map();
  
  track(metricName: string, value: number) {
    if (!this.metrics.has(metricName)) {
      this.metrics.set(metricName, []);
    }
    
    this.metrics.get(metricName)!.push(value);
    
    // Send to analytics service
    this.sendToAnalytics(metricName, value);
  }
  
  getMetric(metricName: string): MetricSummary {
    const values = this.metrics.get(metricName) || [];
    
    return {
      count: values.length,
      mean: this.calculateMean(values),
      median: this.calculateMedian(values),
      p95: this.calculatePercentile(values, 95),
      p99: this.calculatePercentile(values, 99),
      min: Math.min(...values),
      max: Math.max(...values)
    };
  }
  
  private calculateMean(values: number[]): number {
    return values.reduce((a, b) => a + b, 0) / values.length;
  }
  
  private calculateMedian(values: number[]): number {
    const sorted = [...values].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0
      ? (sorted[mid - 1] + sorted[mid]) / 2
      : sorted[mid];
  }
  
  private calculatePercentile(values: number[], percentile: number): number {
    const sorted = [...values].sort((a, b) => a - b);
    const index = Math.ceil((percentile / 100) * sorted.length) - 1;
    return sorted[index];
  }
  
  private sendToAnalytics(metricName: string, value: number) {
    // Integration dengan analytics service (e.g., PostHog, Mixpanel)
    if (typeof window !== 'undefined' && window.analytics) {
      window.analytics.track('metric_recorded', {
        metric: metricName,
        value: value,
        timestamp: Date.now()
      });
    }
  }
  
  // Automated alerts jika metrics diluar threshold
  checkThresholds() {
    const thresholds = {
      validCodeRate: { min: 0.9, severity: 'critical' },
      executionSuccessRate: { min: 0.85, severity: 'high' },
      timeToFirstRender: { max: 3000, severity: 'medium' },
      fps: { min: 30, severity: 'medium' },
      crashRate: { max: 0.01, severity: 'critical' }
    };
    
    for (const [metric, threshold] of Object.entries(thresholds)) {
      const summary = this.getMetric(metric);
      
      if ('min' in threshold && summary.mean < threshold.min) {
        this.alert({
          metric,
          severity: threshold.severity,
          message: `${metric} below threshold: ${summary.mean} < ${threshold.min}`
        });
      }
      
      if ('max' in threshold && summary.mean > threshold.max) {
        this.alert({
          metric,
          severity: threshold.severity,
          message: `${metric} above threshold: ${summary.mean} > ${threshold.max}`
        });
      }
    }
  }
  
  private alert(alert: MetricAlert) {
    console.error(`[METRIC ALERT] ${alert.severity.toUpperCase()}: ${alert.message}`);
    
    // Send to monitoring service (e.g., Sentry, DataDog)
    if (alert.severity === 'critical') {
      // Trigger PagerDuty or similar
    }
  }
}

// Usage
const metrics = new MetricsCollector();

// Track code generation
metrics.track('validCodeRate', code.isValid ? 1 : 0);
metrics.track('timeToFirstRender', performance.now() - startTime);

// Daily report
setInterval(() => {
  metrics.checkThresholds();
}, 24 * 60 * 60 * 1000);
```

### **10.4 Success Criteria for Beta Launch**

```markdown
| Metric | Baseline | Target | Stretch Goal |
|--------|----------|--------|--------------|
| Valid Code Rate | - | 90% | 95% |
| Execution Success | - | 85% | 92% |
| Auto-fix Success | - | 70% | 85% |
| Time to First Render | - | < 3s | < 2s |
| FPS (Simple Graphics) | - | > 30 | > 60 |
| Task Completion | - | 80% | 90% |
| NPS Score | - | > 50 | > 70 |
```

---

## **11. Risk Assessment & Mitigation**

### **11.1 Technical Risks**

| Risk | Probability | Impact | Mitigation Strategy |
|------|-------------|--------|---------------------|
| **LLM generates invalid/malicious code** | High | Critical | • Strict validation layer<br>• Sandboxed execution<br>• Code pattern whitelist<br>• Debugger Agent auto-fix |
| **Performance bottleneck in rendering** | Medium | High | • Renderer abstraction for swappability<br>• Progressive rendering<br>• Object pooling<br>• WebGL acceleration path |
| **Sandbox escape vulnerabilities** | Low | Critical | • Multiple isolation layers (Worker + iframe)<br>• CSP headers<br>• Regular security audits<br>• Disable dangerous APIs |
| **State management complexity** | Medium | Medium | • Immutable data structures<br>• Clear state architecture<br>• Comprehensive testing<br>• State debugging tools |
| **API Level confusion** | Medium | Low | • Clear documentation<br>• AI training on level selection<br>• Examples for each level |

### **11.2 Product Risks**

| Risk | Probability | Impact | Mitigation Strategy |
|------|-------------|--------|---------------------|
| **Users expect WYSIWYG editor** | High | Medium | • Clear onboarding explaining paradigm<br>• Show code + visual simultaneously<br>• Emphasize "conversational" aspect |
| **AI makes too many mistakes** | Medium | High | • Focus on narrow use cases first<br>• Extensive testing suite<br>• Clear error messages<br>• Easy undo/redo |
| **Performance not meeting expectations** | Medium | Medium | • Set realistic expectations<br>• Progressive enhancement<br>• Performance budgets<br>• Optimization agent |
| **Limited use cases at launch** | High | Low | • Focus on "demo wow factor"<br>• Expand gradually<br>• Community feedback loop |

### **11.3 Business Risks**

| Risk | Probability | Impact | Mitigation Strategy |
|------|-------------|--------|---------------------|
| **LLM API costs too high** | Medium | High | • Implement caching<br>• Rate limiting<br>• Optimize prompts<br>• Consider self-hosted models |
| **Competing products launch first** | Low | Medium | • Focus on unique AI-first approach<br>• Build community early<br>• Open source strategy? |
| **Slow user adoption** | Medium | Medium | • Strong marketing at launch<br>• Influencer partnerships<br>• Free tier with limitations |

### **11.4 Mitigation Implementation**

```typescript
// ===== Risk Monitoring System =====
class RiskMonitor {
  private risks: Map<string, RiskStatus> = new Map();
  
  registerRisk(risk: Risk) {
    this.risks.set(risk.id, {
      ...risk,
      status: 'active',
      lastChecked: Date.now(),
      indicators: []
    });
  }
  
  checkIndicators() {
    for (const [id, risk] of this.risks) {
      // Check if risk indicators are triggered
      if (risk.type === 'performance' && this.isPerformanceRisk()) {
        this.triggerMitigation(id);
      }
      
      if (risk.type === 'security' && this.isSecurityRisk()) {
        this.triggerMitigation(id);
      }
      
      if (risk.type === 'quality' && this.isQualityRisk()) {
        this.triggerMitigation(id);
      }
    }
  }
  
  private isPerformanceRisk(): boolean {
    const metrics = metricsCollector.getMetric('timeToFirstRender');
    return metrics.p95 > 5000; // 5 seconds
  }
  
  private isSecurityRisk(): boolean {
    const suspiciousPatterns = securityMonitor.getSuspiciousPatternCount();
    return suspiciousPatterns > 10; // per hour
  }
  
  private isQualityRisk(): boolean {
    const errorRate = metricsCollector.getMetric('executionSuccessRate');
    return errorRate.mean < 0.8; // Below 80%
  }
  
  private triggerMitigation(riskId: string) {
    const risk = this.risks.get(riskId);
    
    console.warn(`[RISK TRIGGERED] ${risk.name}`);
    
    // Execute mitigation strategy
    for (const action of risk.mitigationActions) {
      action.execute();
    }
    
    // Alert team
    this.notifyTeam(risk);
  }
  
  private notifyTeam(risk: RiskStatus) {
    // Send to Slack, email, etc.
  }
}
```

---

## **12. Struktur Proyek**

### **12.1 Monorepo Structure**

```
genesis/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml              # Continuous Integration
│   │   ├── deploy.yml          # Deployment pipeline
│   │   └── security-scan.yml   # Security scanning
│   └── PULL_REQUEST_TEMPLATE.md
│
├── packages/
│   ├── core/                   # genesis.js library
│   │   ├── src/
│   │   │   ├── api/
│   │   │   │   ├── level1/     # Low-level API
│   │   │   │   ├── level2/     # Mid-level API
│   │   │   │   └── level3/     # High-level API
│   │   │   ├── state/
│   │   │   │   ├── StateManager.ts
│   │   │   │   ├── ObjectRegistry.ts
│   │   │   │   ├── SceneGraph.ts
│   │   │   │   └── HistoryManager.ts
│   │   │   ├── renderer/
│   │   │   │   ├── IRenderer.ts
│   │   │   │   ├── P5Adapter.ts
│   │   │   │   ├── Canvas2DAdapter.ts
│   │   │   │   └── RendererFactory.ts
│   │   │   ├── utils/
│   │   │   │   ├── color.ts
│   │   │   │   ├── math.ts
│   │   │   │   └── validation.ts
│   │   │   └── index.ts
│   │   ├── __tests__/
│   │   │   ├── unit/
│   │   │   ├── integration/
│   │   │   └── fixtures/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── README.md
│   │
│   ├── orchestrator/           # AI Agent system
│   │   ├── src/
│   │   │   ├── agents/
│   │   │   │   ├── TranslatorAgent.ts
│   │   │   │   ├── DebuggerAgent.ts
│   │   │   │   └── OptimizerAgent.ts
│   │   │   ├── llm/
│   │   │   │   ├── GeminiClient.ts
│   │   │   │   ├── PromptBuilder.ts
│   │   │   │   └── ResponseParser.ts
│   │   │   ├── context/
│   │   │   │   ├── ConversationManager.ts
│   │   │   │   └── ContextBuilder.ts
│   │   │   └── index.ts
│   │   ├── __tests__/
│   │   ├── package.json
│   │   └── README.md
│   │
│   ├── sandbox/                # Code execution environment
│   │   ├── src/
│   │   │   ├── SandboxManager.ts
│   │   │   ├── WorkerExecutor.ts
│   │   │   ├── IframeExecutor.ts
│   │   │   ├── SecurityValidator.ts
│   │   │   ├── ResourceController.ts
│   │   │   └── index.ts
│   │   ├── workers/
│   │   │   └── sandbox-worker.js
│   │   ├── __tests__/
│   │   ├── package.json
│   │   └── README.md
│   │
│   ├── renderers/              # Renderer adapters
│   │   ├── p5/
│   │   │   ├── src/
│   │   │   │   └── P5Adapter.ts
│   │   │   └── package.json
│   │   ├── canvas2d/
│   │   │   ├── src/
│   │   │   │   └── Canvas2DAdapter.ts
│   │   │   └── package.json
│   │   └── three/
│   │       ├── src/
│   │       │   └── ThreeAdapter.ts
│   │       └── package.json
│   │
│   ├── shared/                 # Shared utilities
│   │   ├── src/
│   │   │   ├── types/
│   │   │   ├── constants/
│   │   │   └── utils/
│   │   └── package.json
│   │
│   └── analytics/              # Metrics & monitoring
│       ├── src/
│       │   ├── MetricsCollector.ts
│       │   ├── RiskMonitor.ts
│       │   └── PerformanceTracker.ts
│       └── package.json
│
├── apps/
│   ├── web-prototype/          # Main web application
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── ChatInterface/
│   │   │   │   │   ├── ChatInput.tsx
│   │   │   │   │   ├── MessageList.tsx
│   │   │   │   │   └── index.tsx
│   │   │   │   ├── Canvas/
│   │   │   │   │   ├── CanvasView.tsx
│   │   │   │   │   ├── CanvasToolbar.tsx
│   │   │   │   │   └── index.tsx
│   │   │   │   ├── CodeInspector/
│   │   │   │   │   ├── CodeView.tsx
│   │   │   │   │   ├── SyntaxHighlight.tsx
│   │   │   │   │   └── index.tsx
│   │   │   │   └── Layout/
│   │   │   │       ├── ThreePanelLayout.tsx
│   │   │   │       └── index.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useGenesis.ts
│   │   │   │   ├── useChat.ts
│   │   │   │   └── useCanvas.ts
│   │   │   ├── services/
│   │   │   │   ├── api.ts
│   │   │   │   └── storage.ts
│   │   │   ├── store/
│   │   │   │   ├── appStore.ts
│   │   │   │   └── types.ts
│   │   │   ├── App.tsx
│   │   │   ├── main.tsx
│   │   │   └── index.html
│   │   ├── public/
│   │   ├── e2e/
│   │   │   ├── chat.spec.ts
│   │   │   ├── canvas.spec.ts
│   │   │   └── integration.spec.ts
│   │   ├── vite.config.ts
│   │   ├── package.json
│   │   └── README.md
│   │
│   └── docs-site/              # Documentation website
│       ├── docs/
│       │   ├── getting-started.md
│       │   ├── api-reference/
│       │   ├── examples/
│       │   └── architecture.md
│       ├── docusaurus.config.js
│       └── package.json
│
├── tools/
│   ├── test-utils/             # Shared testing utilities
│   │   ├── src/
│   │   │   ├── mocks/
│   │   │   ├── fixtures/
│   │   │   └── helpers/
│   │   └── package.json
│   │
│   └── build-tools/            # Custom build scripts
│       ├── bundle-size.js
│       └── version-bump.js
│
├── docs/
│   ├── architecture/
│   │   ├── 00-overview.md
│   │   ├── 01-core-library.md
│   │   ├── 02-ai-orchestrator.md
│   │   ├── 03-sandbox.md
│   │   └── 04-security.md
│   ├── api/
│   │   ├── level1.md
│   │   ├── level2.md
│   │   └── level3.md
│   ├── guides/
│   │   ├── quickstart.md
│   │   ├── prompting-tips.md
│   │   └── best-practices.md
│   └── contributing.md
│
├── .eslintrc.js
├── .prettierrc
├── .gitignore
├── package.json                # Root workspace config
├── pnpm-workspace.yaml
├── turbo.json                  # Turborepo config
├── tsconfig.base.json
├── LICENSE
└── README.md
```

### **12.2 Package Dependencies**

```json
// Root package.json
{
  "name": "genesis-monorepo",
  "private": true,
  "version": "0.1.0",
  "workspaces": [
    "packages/*",
    "apps/*",
    "tools/*"
  ],
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "test": "turbo run test",
    "test:e2e": "turbo run test:e2e",
    "lint": "turbo run lint",
    "format": "prettier --write \"**/*.{ts,tsx,js,jsx,json,md}\"",
    "typecheck": "turbo run typecheck",
    "clean": "turbo run clean && rm -rf node_modules",
    "changeset": "changeset",
    "version-packages": "changeset version",
    "release": "turbo run build && changeset publish"
  },
  "devDependencies": {
    "@changesets/cli": "^2.27.1",
    "@types/node": "^20.10.0",
    "eslint": "^8.55.0",
    "prettier": "^3.1.0",
    "turbo": "^1.11.0",
    "typescript": "^5.3.3",
    "vitest": "^1.0.4"
  },
  "engines": {
    "node": ">=18.0.0",
    "pnpm": ">=8.0.0"
  },
  "packageManager": "pnpm@8.12.0"
}
```

```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*'
  - 'apps/*'
  - 'tools/*'
```

```json
// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**", "build/**"]
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": ["coverage/**"]
    },
    "test:e2e": {
      "dependsOn": ["build"]
    },
    "lint": {
      "outputs": []
    },
    "typecheck": {
      "dependsOn": ["^build"],
      "outputs": []
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "clean": {
      "cache": false
    }
  }
}
```

### **12.3 Package.json untuk Core Library**

```json
// packages/core/package.json
{
  "name": "@genesis/core",
  "version": "0.1.0",
  "description": "Core library for Genesis creative compiler",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./level1": {
      "import": "./dist/level1.mjs",
      "require": "./dist/level1.js",
      "types": "./dist/level1.d.ts"
    },
    "./level2": {
      "import": "./dist/level2.mjs",
      "require": "./dist/level2.js",
      "types": "./dist/level2.d.ts"
    },
    "./level3": {
      "import": "./dist/level3.mjs",
      "require": "./dist/level3.js",
      "types": "./dist/level3.d.ts"
    }
  },
  "scripts": {
    "dev": "tsup --watch",
    "build": "tsup",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "typecheck": "tsc --noEmit",
    "lint": "eslint src/",
    "clean": "rm -rf dist"
  },
  "dependencies": {
    "immer": "^10.0.3",
    "nanoid": "^5.0.4"
  },
  "devDependencies": {
    "@types/node": "^20.10.0",
    "@vitest/coverage-v8": "^1.0.4",
    "tsup": "^8.0.1",
    "typescript": "^5.3.3",
    "vitest": "^1.0.4"
  },
  "peerDependencies": {
    "p5": "^1.7.0"
  },
  "peerDependenciesMeta": {
    "p5": {
      "optional": true
    }
  }
}
```

---

## **13. Peta Jalan**

### **13.1 Fase 1: Fondasi Inti** (Bulan 1-2)

**Tujuan**: Membangun core library dan proof of concept.

#### **Sprint 1-2 (Minggu 1-4)**
```
Week 1-2: Core Library Setup
✅ Setup monorepo dengan pnpm + Turborepo
✅ Implementasi IRenderer interface
✅ Buat P5Adapter sebagai renderer pertama
✅ Implementasi State Management (StateManager, ObjectRegistry)
✅ Unit tests untuk core functionality

Deliverables:
- @genesis/core package dengan Level 1 API
- Working P5 renderer adapter
- Test coverage > 80%

Week 3-4: Level 2 & 3 APIs
✅ Implementasi Level 2 API (composition)
✅ Implementasi Level 3 API (10 high-level functions)
✅ SceneGraph implementation
✅ HistoryManager untuk undo/redo
✅ Documentation untuk setiap API level

Deliverables:
- Complete 3-level API
- API documentation
- 20+ code examples
```

#### **Sprint 3-4 (Minggu 5-8)**
```
Week 5-6: Sandbox Implementation
✅ Implement SandboxManager
✅ Worker-based execution
✅ Security validation layer
✅ Resource controller & rate limiting
✅ Error capturing system

Deliverables:
- Working sandbox with security guarantees
- Performance benchmarks
- Security audit report

Week 7-8: Basic UI
✅ Three-panel layout implementation
✅ Canvas view dengan real-time rendering
✅ Code inspector dengan syntax highlighting
✅ Basic chat interface (no AI yet)
✅ Manual code execution flow

Deliverables:
- Functional web prototype (without AI)
- User can write code manually and see results
- E2E tests for basic flows
```

**Milestone 1 Review**:
- ✅ Core library functional
- ✅ Sandbox secure and performant
- ✅ Basic UI working
- ✅ Manual code-to-visual pipeline proven

---

### **13.2 Fase 2: Integrasi Kecerdasan** (Bulan 3-4)

**Tujuan**: Mengintegrasikan AI agents dan membuat system end-to-end.

#### **Sprint 5-6 (Minggu 9-12)**
```
Week 9-10: Translator Agent
✅ LLM client implementation (Gemini API)
✅ Prompt engineering untuk code generation
✅ Intent classification
✅ Context management system
✅ Integration dengan UI

Deliverables:
- Working Translator Agent
- 10 prompt templates
- Accuracy testing (target: 85% valid code)

Week 11-12: Debugger Agent
✅ Error classification system
✅ Rule-based fixes untuk common errors
✅ LLM-based diagnosis untuk complex errors
✅ Auto-fix implementation
✅ Integration dengan sandbox error reporting

Deliverables:
- Working Debugger Agent
- 15+ error fix rules
- Auto-fix success rate > 70%
```

#### **Sprint 7-8 (Minggu 13-16)**
```
Week 13-14: Optimizer Agent
✅ Code quality analysis
✅ Performance optimization suggestions
✅ Best practice enforcement
✅ Integration dengan UI (show suggestions)

Deliverables:
- Working Optimizer Agent
- 10+ optimization rules
- Performance improvement metrics

Week 15-16: Full System Integration
✅ Connect all agents in orchestrator
✅ Conversation flow implementation
✅ State persistence across sessions
✅ Error recovery workflows
✅ Polish UI/UX

Deliverables:
- End-to-end working system
- All agents coordinating properly
- Smooth user experience
```

**Milestone 2 Review**:
- ✅ AI can generate code from natural language
- ✅ System can auto-fix most common errors
- ✅ Complete conversation loop working
- ✅ Performance meets targets

---

### **13.3 Fase 3: Polish & Beta** (Bulan 5-6)

**Tujuan**: Refinement, testing, dan beta launch.

#### **Sprint 9-10 (Minggu 17-20)**
```
Week 17-18: Quality & Performance
✅ Comprehensive testing (unit, integration, E2E)
✅ Performance optimization
✅ Security hardening
✅ Accessibility improvements
✅ Error handling polish

Week 19-20: Documentation & Examples
✅ Complete API documentation
✅ User guide & tutorials
✅ 50+ example prompts
✅ Video tutorials
✅ Onboarding flow

Deliverables:
- Test coverage > 85%
- Performance benchmarks met
- Complete documentation
- Onboarding experience
```

#### **Sprint 11-12 (Minggu 21-24)**
```
Week 21-22: Beta Preparation
✅ Beta user recruitment
✅ Analytics implementation
✅ Feedback collection system
✅ Bug tracking setup
✅ Support channels

Week 23-24: Beta Launch & Iteration
✅ Soft launch to 50 beta users
✅ Monitor metrics daily
✅ Rapid bug fixing
✅ Feature refinements based on feedback
✅ Prepare for public launch

Deliverables:
- Beta launch successful
- 50+ beta users testing
- Metrics collection working
- Critical bugs fixed
```

**Milestone 3 Review**:
- ✅ Beta users can successfully create designs
- ✅ Success metrics achieved
- ✅ Ready for public launch
- ✅ Marketing materials prepared

---

### **13.4 Post-v0.1 Roadmap** (Bulan 7+)

```
Q3 2025: Public Launch & Growth
- Public launch v1.0
- Marketing campaign
- Community building
- Partnership discussions

Q4 2025: Feature Expansion
- Additional renderers (Three.js for 3D)
- More Level 3 templates
- Export functionality (SVG, PNG, code)
- Template marketplace

Q1 2026: Collaboration Features
- Multi-user editing
- Sharing & embedding
- Version control
- Team workspaces

Q2 2026: Enterprise Features
- Design system integration
- API for programmatic access
- Self-hosted option
- Advanced analytics
```

---

## **14. Stack Teknologi**

### **14.1 Core Technologies**

```typescript
// Technology Stack Definition
const TECH_STACK = {
  // Language & Runtime
  language: 'TypeScript 5.3+',
  runtime: 'Node.js 18+ / Browser',
  
  // Build & Tooling
  monorepo: 'pnpm + Turborepo',
  bundler: 'tsup (for packages), Vite (for apps)',
  testing: 'Vitest + Playwright',
  linting: 'ESLint + Prettier',
  
  // Frontend
  framework: 'React 18+',
  stateManagement: 'Zustand',
  styling: 'Tailwind CSS 3+',
  codeHighlight: 'Shiki',
  
  // Rendering
  primaryRenderer: 'p5.js 1.7+',
  fallbackRenderer: 'Canvas 2D API',
  futureRenderer: 'Three.js (for 3D)',
  
  // AI & LLM
  llmProvider: 'Google Gemini API',
  fallbackLLM: 'Anthropic Claude (optional)',
  promptManagement: 'Custom prompt builder',
  
  // Backend (if needed)
  serverFramework: 'Hono / Express',
  database: 'PostgreSQL (for user data)',
  caching: 'Redis',
  
  // Security
  sandboxing: 'Web Workers + iframe',
  csp: 'Strict Content Security Policy',
  validation: 'Zod for schema validation',
  
  // Analytics & Monitoring
  analytics: 'PostHog',
  errorTracking: 'Sentry',
  performance: 'Web Vitals',
  
  // DevOps
  hosting: 'Vercel (frontend) / Railway (backend)',
  ci_cd: 'GitHub Actions',
  containerization: 'Docker (for self-hosted)',
  
  // Documentation
  docs: 'Docusaurus 3',
  apiDocs: 'TypeDoc'
};
```

### **14.2 Dependency Management**

```json
// Shared dependencies across workspace
{
  "dependencies": {
    // Core utilities
    "nanoid": "^5.0.4",
    "immer": "^10.0.3",
    "zod": "^3.22.4",
    
    // State management
    "zustand": "^4.4.7",
    
    // Date/time
    "date-fns": "^3.0.6"
  },
  "devDependencies": {
    // TypeScript
    "typescript": "^5.3.3",
    "@types/node": "^20.10.0",
    
    // Testing
    "vitest": "^1.0.4",
    "@vitest/coverage-v8": "^1.0.4",
    "@playwright/test": "^1.40.0",
    
    // Linting & Formatting
    "eslint": "^8.55.0",
    "@typescript-eslint/eslint-plugin": "^6.14.0",
    "@typescript-eslint/parser": "^6.14.0",
    "prettier": "^3.1.0",
    "prettier-plugin-tailwindcss": "^0.5.9",
    
    // Build tools
    "tsup": "^8.0.1",
    "vite": "^5.0.8",
    "turbo": "^1.11.0"
  }
}
```

### **14.3 Package-Specific Dependencies**

#### **@genesis/core**
```json
{
  "dependencies": {
    "immer": "^10.0.3",
    "nanoid": "^5.0.4"
  },
  "peerDependencies": {
    "p5": "^1.7.0"
  },
  "peerDependenciesMeta": {
    "p5": {
      "optional": true
    }
  }
}
```

#### **@genesis/orchestrator**
```json
{
  "dependencies": {
    "@google/generative-ai": "^0.1.3",
    "zod": "^3.22.4",
    "p-queue": "^8.0.1",
    "p-retry": "^6.1.0"
  },
  "devDependencies": {
    "@types/node": "^20.10.0"
  }
}
```

#### **@genesis/sandbox**
```json
{
  "dependencies": {
    "comlink": "^4.4.1",
    "zod": "^3.22.4"
  }
}
```

#### **apps/web-prototype**
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "zustand": "^4.4.7",
    "@tanstack/react-query": "^5.14.2",
    
    // UI Components
    "lucide-react": "^0.294.0",
    "react-hot-toast": "^2.4.1",
    
    // Code highlighting
    "shiki": "^0.14.7",
    
    // Canvas rendering
    "p5": "^1.7.0",
    "@types/p5": "^1.7.3",
    
    // Utilities
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.3.6",
    "vite": "^5.0.8"
  }
}
```

### **14.4 Configuration Files**

#### **TypeScript Configuration**

```json
// tsconfig.base.json (root)
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowJs": true,
    "checkJs": false,
    "jsx": "react-jsx",
    
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    
    "baseUrl": ".",
    "paths": {
      "@genesis/core": ["./packages/core/src"],
      "@genesis/orchestrator": ["./packages/orchestrator/src"],
      "@genesis/sandbox": ["./packages/sandbox/src"],
      "@genesis/shared": ["./packages/shared/src"]
    }
  },
  "exclude": ["node_modules", "dist", "build"]
}
```

```json
// packages/core/tsconfig.json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["**/*.test.ts", "**/*.spec.ts"]
}
```

#### **ESLint Configuration**

```javascript
// .eslintrc.js
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: true,
    node: true,
    es2022: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
    ],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'no-console': ['warn', { allow: ['warn', 'error'] }]
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
```

#### **Prettier Configuration**

```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "endOfLine": "lf",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

#### **Vitest Configuration**

```typescript
// vitest.config.ts (shared)
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test-setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        '**/*.spec.ts',
        '**/*.test.ts',
        '**/test-utils/**'
      ]
    },
    include: ['**/*.{test,spec}.{ts,tsx}'],
    testTimeout: 10000
  }
});
```

#### **Tailwind Configuration**

```javascript
// apps/web-prototype/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          900: '#0c4a6e'
        },
        accent: {
          500: '#f59e0b',
          600: '#d97706'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'Monaco', 'monospace']
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      }
    }
  },
  plugins: []
};
```

### **14.5 GitHub Actions CI/CD**

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    name: Test
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [18.x, 20.x]
    
    steps:
      - uses: actions/checkout@v4
      
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      
      - name: Setup Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Typecheck
        run: pnpm typecheck
      
      - name: Lint
        run: pnpm lint
      
      - name: Test
        run: pnpm test --coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json
          flags: unittests

  build:
    name: Build
    runs-on: ubuntu-latest
    needs: test
    
    steps:
      - uses: actions/checkout@v4
      
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20.x
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Build packages
        run: pnpm build
      
      - name: Check bundle size
        run: pnpm run bundle-size-check

  e2e:
    name: E2E Tests
    runs-on: ubuntu-latest
    needs: build
    
    steps:
      - uses: actions/checkout@v4
      
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20.x
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Install Playwright
        run: pnpm exec playwright install --with-deps
      
      - name: Run E2E tests
        run: pnpm test:e2e
      
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
```

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  deploy:
    name: Deploy to Production
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20.x
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Build
        run: pnpm build
        env:
          VITE_GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

```yaml
# .github/workflows/security-scan.yml
name: Security Scan

on:
  schedule:
    - cron: '0 0 * * 0' # Weekly on Sunday
  workflow_dispatch:

jobs:
  security:
    name: Security Audit
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20.x
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Run audit
        run: pnpm audit --audit-level=moderate
      
      - name: OWASP Dependency Check
        uses: dependency-check/Dependency-Check_Action@main
        with:
          project: 'genesis'
          path: '.'
          format: 'HTML'
      
      - name: Upload results
        uses: actions/upload-artifact@v3
        with:
          name: security-report
          path: reports/
```

---

## **15. Appendix**

### **15.1 Glossary**

| Term | Definition |
|------|------------|
| **Genesis.js** | Core library yang menyediakan API untuk generasi grafis |
| **Renderer** | Backend engine yang melakukan actual drawing (p5.js, Canvas2D, etc.) |
| **Agent** | AI component dengan specialized task (Translator, Debugger, Optimizer) |
| **Sandbox** | Isolated execution environment untuk menjalankan user-generated code |
| **Level 1/2/3 API** | Three tiers of abstraction dalam genesis.js API |
| **State** | Internal representation dari canvas dan objects |
| **Orchestrator** | System yang mengkoordinasikan multiple AI agents |
| **CSP** | Content Security Policy untuk web security |
| **Monorepo** | Single repository containing multiple packages |

### **15.2 API Quick Reference**

```typescript
// Level 3 (High-Level)
buatKartuNama(options)
buatLogo(options)
buatGrafikBatang(options)
buatGrafikGaris(options)
buatDashboard(options)

// Level 2 (Mid-Level)
buatCanvas(width, height)
buatGrup(options)
buatLayout(type, options)
buatKotak(options)
buatLingkaran(options)
buatTeks(content, options)
tambahAnimasi(object, animation)

// Level 1 (Low-Level)
const ctx = ambilRenderer()
ctx.setFillColor(color)
ctx.setStrokeColor(color)
ctx.drawRect(x, y, w, h)
ctx.drawCircle(x, y, radius)
ctx.drawText(text, x, y)
```

### **15.3 Common Patterns**

#### **Pattern: Create & Modify**
```javascript
// Create
const card = buatKartuNama({ nama: 'John' });

// Modify
state.objects.update(card.id, {
  style: { backgroundColor: '#000000' }
});
```

#### **Pattern: Composition**
```javascript
const container = buatGrup({ x: 0, y: 0 });
const title = buatTeks('Title', { x: 10, y: 10 });
const icon = buatIkon('star', { x: 100, y: 10 });

state.hierarchy.addChild(container.id, title.id);
state.hierarchy.addChild(container.id, icon.id);
```

#### **Pattern: Animation**
```javascript
const circle = buatLingkaran({ x: 100, y: 100, radius: 50 });

tambahAnimasi(circle, {
  type: 'move',
  to: { x: 500, y: 100 },
  duration: 2000,
  easing: 'ease-in-out'
});
```

### **15.4 Error Handling Best Practices**

```typescript
// Always wrap execution in try-catch
try {
  const code = await translator.translate(prompt);
  const result = await sandbox.execute(code);
  
  if (!result.success) {
    const fix = await debugger.autoFix(code, result.errors[0]);
    const retryResult = await sandbox.execute(fix);
    
    if (!retryResult.success) {
      // Escalate to user
      showError('Unable to generate valid code. Please try rephrasing.');
    }
  }
} catch (error) {
  logger.error('Execution failed', error);
  metrics.track('execution_failure', 1);
  throw error;
}
```

### **15.5 Performance Optimization Tips**

```typescript
// 1. Use object pooling for frequently created objects
const pool = createObjectPool(() => buatLingkaran());

// Instead of:
for (let i = 0; i < 1000; i++) {
  buatLingkaran({ x: i, y: i });
}

// Use:
for (let i = 0; i < 1000; i++) {
  const circle = pool.get();
  circle.setPosition(i, i);
}

// 2. Batch draw calls
const batch = buatDrawBatch();
batch.tambahPersegi(0, 0, 100, 100);
batch.tambahLingkaran(200, 200, 50);
batch.render(); // Single flush

// 3. Use requestAnimationFrame for animations
function animate() {
  updatePositions();
  render();
  requestAnimationFrame(animate);
}
```

### **15.6 Security Checklist**

- [ ] All user code runs in isolated sandbox
- [ ] CSP headers properly configured
- [ ] No access to localStorage/sessionStorage from sandbox
- [ ] Rate limiting implemented
- [ ] Input validation on all user inputs
- [ ] API keys stored in environment variables
- [ ] Regular dependency audits
- [ ] HTTPS enforced in production
- [ ] XSS protection enabled
- [ ] CSRF tokens for state-changing operations

### **15.7 Testing Strategy**

```typescript
// Unit Tests (packages/core/__tests__)
describe('StateManager', () => {
  it('should add object to registry', () => {
    const state = buatState();
    const id = state.objects.add({ type: 'rect' });
    expect(state.objects.get(id)).toBeDefined();
  });
});

// Integration Tests (packages/orchestrator/__tests__)
describe('Translator Agent', () => {
  it('should generate valid code from prompt', async () => {
    const agent = new TranslatorAgent();
    const result = await agent.translate('buat lingkaran merah');
    expect(result.code).toContain('buatLingkaran');
    expect(result.code).toContain('warna');
  });
});

// E2E Tests (apps/web-prototype/e2e/)
test('user can create business card', async ({ page }) => {
  await page.goto('/');
  await page.fill('[data-testid="chat-input"]', 'buat kartu nama');
  await page.click('[data-testid="send-button"]');
  
  // Wait for canvas to render
  await page.waitForSelector('canvas');
  
  // Verify visual output
  const canvas = await page.locator('canvas');
  expect(await canvas.screenshot()).toMatchSnapshot('business-card.png');
});
```

---

## **16. Conclusion & Next Steps**

### **16.1 Document Summary**

Dokumen ini telah menyediakan blueprint lengkap untuk membangun GENESIS v0.1, sebuah AI-powered creative compiler yang revolusioner. Arsitektur three-pillar (Core Library, AI Orchestrator, Live Sandbox) memberikan fondasi yang solid untuk:

✅ **Ekspresivitas**: Multi-level API memungkinkan AI memilih tingkat abstraksi yang tepat  
✅ **Keamanan**: Sandbox dengan multiple isolation layers  
✅ **Kecerdasan**: Agent system yang dapat generate, debug, dan optimize code  
✅ **Skalabilitas**: Renderer-agnostic design untuk future extensibility  
✅ **Reliability**: Comprehensive error handling dan recovery mechanisms  

### **16.2 Immediate Next Steps**

**Week 1 Actions**:
1. ✅ Setup monorepo structure dengan pnpm + Turborepo
2. ✅ Initialize Git repository dengan proper .gitignore
3. ✅ Setup CI/CD pipelines (GitHub Actions)
4. ✅ Create project documentation in `/docs`
5. ✅ Begin implementation of `@genesis/core` package

**Week 2-3 Actions**:
1. ✅ Implement IRenderer interface dan P5Adapter
2. ✅ Build State Management system
3. ✅ Create first 10 Level 3 API functions
4. ✅ Write unit tests (target: >80% coverage)

### **16.3 Success Criteria Reminder**

Untuk dianggap berhasil, prototype v0.1 harus:
- ✅ 90% prompts sederhana menghasilkan kode valid
- ✅ Render time < 100ms untuk grafis sederhana
- ✅ Debugger Agent dapat auto-fix 70% error umum
- ✅ User dapat membuat design card dalam < 2 menit
- ✅ Zero security vulnerabilities di sandbox

### **16.4 Open Questions for Team Discussion**

1. **LLM Provider**: Apakah Gemini API cukup, atau perlu fallback ke Claude/GPT-4?
2. **Monetization**: Freemium model atau open source dengan paid hosting?
3. **Community**: Apakah kita mau open source core library dari awal?
4. **Scope Creep**: Bagaimana kita enforce "no new features" selama fase 1-3?

### **16.5 Contact & Resources**

- **Documentation**: `/docs` folder dalam repository
- **API Reference**: https://docs.genesis.dev (setelah launch)
- **Community**: Discord server (TBD)
- **Issue Tracker**: GitHub Issues
- **Email**: team@genesis.dev (TBD)

---

## **Document Sign-off**

**Version**: 0.2  
**Status**: ✅ Ready for Implementation  
**Approved By**: [To be filled]  
**Date**: 4 Oktober 2025  

**Next Review**: After Phase 1 completion (Week 8)

---

**Catatan Akhir**: Dokumen ini adalah living document yang akan diupdate seiring perkembangan project. Semua perubahan signifikan harus melalui review process dan didokumentasikan di CHANGELOG.md.

---

# 🎉 **GENESIS - Let's Build the Future of Creative Computing!** 🎉