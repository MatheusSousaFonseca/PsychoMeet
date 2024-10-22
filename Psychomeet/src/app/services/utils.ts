export function formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', options);
  }
  
  export function formatPhone(phone: string): string {
    // Formata o telefone no formato (XX) XXXXX-XXXX
    return phone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
  }
  