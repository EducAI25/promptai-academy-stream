
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import AI from "./pages/AI";
import Programming from "./pages/Programming";
import Marketing from "./pages/Marketing";
import MyLearning from "./pages/MyLearning";
import Auth from "./pages/Auth";
import Instructors from "./pages/Instructors";
import Subscribe from "./pages/Subscribe";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cursos" element={<Courses />} />
          <Route path="/curso/:id" element={<CourseDetail />} />
          <Route path="/ia" element={<AI />} />
          <Route path="/programacao" element={<Programming />} />
          <Route path="/marketing" element={<Marketing />} />
          <Route path="/meu-aprendizado" element={<MyLearning />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/docentes" element={<Instructors />} />
          <Route path="/assinar" element={<Subscribe />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="/carrinho" element={<Cart />} />
          <Route path="/painel" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
