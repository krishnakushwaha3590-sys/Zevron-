import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight, CheckCircle2, BarChart3, Zap } from 'lucide-react';

export const Route = createFileRoute('/')();

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-royal">
      {/* Navigation */}
      <nav className="border-b border-border/20 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gold">⚡ Zevron</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/todos"
              className="px-4 py-2 rounded-lg text-foreground hover:text-gold transition"
            >
              My Tasks
            </Link>
            <Link
              to="/todos"
              className="btn-gold px-6 py-2 text-sm"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-20 md:py-32">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            Stay <span className="text-gold">Organized</span> & Productive
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto mb-8">
            A powerful task management application that syncs locally, helping you manage your daily tasks efficiently. No distractions, just pure productivity.
          </p>
          <Link
            to="/todos"
            className="btn-gold inline-flex items-center gap-2 px-8 py-4 text-lg"
          >
            Start Managing Tasks
            <ArrowRight size={24} />
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-20">
          <div className="bg-card border border-border rounded-lg p-6 hover:border-gold transition">
            <CheckCircle2 className="text-gold mb-4" size={32} />
            <h3 className="text-xl font-semibold text-foreground mb-2">Easy Task Management</h3>
            <p className="text-foreground/70">Create, organize, and complete tasks with a beautiful, intuitive interface.</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6 hover:border-gold transition">
            <Zap className="text-accent mb-4" size={32} />
            <h3 className="text-xl font-semibold text-foreground mb-2">Local Storage</h3>
            <p className="text-foreground/70">Your tasks are saved locally, ensuring privacy and quick access anytime.</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6 hover:border-gold transition">
            <BarChart3 className="text-blue-400 mb-4" size={32} />
            <h3 className="text-xl font-semibold text-foreground mb-2">Track Progress</h3>
            <p className="text-foreground/70">See your productivity stats with completion tracking and category filtering.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-card border-t border-border py-16">
        <div className="max-w-2xl mx-auto text-center px-4 md:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
          <p className="text-foreground/70 mb-8">Start organizing your tasks now and boost your productivity.</p>
          <Link
            to="/todos"
            className="btn-gold inline-flex items-center gap-2 px-8 py-3"
          >
            Open Task Manager
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}

Route.component = HomePage;
