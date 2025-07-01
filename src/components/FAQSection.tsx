import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

const FAQSection = () => {
  const faqs = [
    {
      question: "O que é a PromptAI Academy?",
      answer: "A PromptAI Academy é uma plataforma de educação online especializada em Inteligência Artificial, programação, marketing digital e tecnologias emergentes. Oferecemos cursos práticos e atualizados ministrados por especialistas da indústria."
    },
    {
      question: "Quanto custa?",
      answer: "Oferecemos diferentes planos de assinatura para atender suas necessidades. Temos planos mensais a partir de R$ 29,90 e planos anuais com desconto especial. Também oferecemos período de teste gratuito para novos usuários."
    },
    {
      question: "Onde posso assistir às aulas?",
      answer: "Você pode assistir em qualquer dispositivo com acesso à internet: computador, tablet, smartphone ou Smart TV. Nossa plataforma é otimizada para todos os dispositivos e você também pode baixar as aulas para assistir offline."
    },
    {
      question: "Como cancelar minha assinatura?",
      answer: "Você pode cancelar sua assinatura a qualquer momento através da sua conta na plataforma. Não há taxas de cancelamento e você continuará tendo acesso até o final do período já pago."
    },
    {
      question: "Que cursos posso fazer na PromptAI Academy?",
      answer: "Oferecemos mais de 200 cursos nas áreas de Inteligência Artificial, Programação, Marketing Digital, Data Science e Design UX/UI. Desde cursos básicos para iniciantes até especializações avançadas para profissionais experientes."
    },
    {
      question: "A PromptAI Academy é adequada para iniciantes?",
      answer: "Sim! Temos cursos para todos os níveis, desde iniciantes completos até especialistas. Cada curso indica claramente o nível de dificuldade e pré-requisitos necessários. Nossos instrutores explicam conceitos complexos de forma didática e acessível."
    }
  ];

  return (
    <div className="py-16 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-white text-3xl md:text-4xl font-bold mb-12 text-center">
          Perguntas Frequentes
        </h2>
        
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border border-border bg-card/30 rounded-lg px-6 hover:bg-card/50 transition-colors"
            >
              <AccordionTrigger className="text-white text-lg font-medium hover:no-underline py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQSection;