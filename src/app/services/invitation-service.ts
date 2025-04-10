import { api } from "../services/api";


export const fetchInvitations = (userId: string) => {
  return api({
    url: `/project-invitations/${userId}/pending`,
    method: "GET",
    messageError: "Erro ao buscar convites.",
  });
};

export const acceptInvitation = (invitationId: string) => {
  return api({
    url: `/project-invitations/${invitationId}/accept`,
    method: "PUT",
    messageSuccess: "Convite aceito com sucesso!",
    messageError: "Erro ao aceitar convite.",
  });
};

export const declineInvitation = (invitationId: string) => {
  return api({
    url: `/project-invitations/${invitationId}/decline`,
    method: "PUT",
    messageSuccess: "Convite recusado.",
    messageError: "Erro ao recusar convite.",
  });
};

export const sendInvitation = (projectId: string, body: { userEmail: string; invitedById: string }) => {
  return api({
    url: `/project-invitations/${projectId}/invite`,
    method: "POST",
    body,
    messageSuccess: "Convite enviado com sucesso!",
    messageError: "Erro ao enviar convite.",
  });
};
