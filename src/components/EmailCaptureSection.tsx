import React, { useState } from 'react';
import { ChevronRight, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const EmailCaptureSection = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para capturar o email
    console.log('Email capturado:', email);
    setEmail('');
  };

  return (
    <div className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <Mail className="w-16 h-16 text-primary mx-auto mb-6" />
          
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">
            Pronto para começar sua jornada?
          </h2>
          
          <p className="text-muted-foreground text-lg mb-8">
            Insira seu email para criar ou acessar sua conta na PromptAI Academy.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Seu melhor email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-background/80 border-border text-white placeholder:text-muted-foreground"
              required
            />
            <Button 
              type="submit"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium whitespace-nowrap"
            >
              Começar Agora
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
          
          <p className="text-muted-foreground text-sm mt-4">
            Teste grátis por 7 dias. Cancele quando quiser.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailCaptureSection;