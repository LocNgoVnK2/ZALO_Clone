﻿using AutoMapper;
using Infrastructure.Entities;
using Zalo_Clone.Models;

namespace Zalo_Clone
{
    public class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<ReactionModel, Reaction>();
            CreateMap<Reaction, ReactionModel>();
        }
    }
}
