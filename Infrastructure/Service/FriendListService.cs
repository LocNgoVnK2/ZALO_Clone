﻿using Infrastructure.Entities;
using Infrastructure.Repository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Service
{
    public interface IFriendListService
    {
        Task<List<FriendList>> GetFriendListOfUser(string userID);
        Task<bool> UnFriend(string user1, string user2);
        Task<bool> AddFriend(string userSrcId, string userDesId);

    }
    public class FriendListService : IFriendListService
    {
        private IFriendListRepository _repo;
        public FriendListService(IFriendListRepository repo)
        {
            this._repo = repo;
        }

        public async Task<bool> AddFriend(string user1, string user2)
        {
            bool areFriends = await _repo.GetAll()
                .AnyAsync(f => (f.User1 == user1 && f.User2 == user2) || (f.User1 == user2 && f.User2 == user1));

            if (areFriends)
            {
                return false;
            }

            FriendList newFriend = new FriendList()
            {
                User1 = user1,
                User2 = user2
            };
            return await _repo.Add(newFriend);
        }

        public async Task<List<FriendList>> GetFriendListOfUser(string userID)
        {
            var friendList= await _repo.GetAll().Where(f => f.User1.Equals(userID) || f.User2.Equals(userID)).ToListAsync();
            return friendList;
        }
        public async Task<bool> UnFriend(string userSrcId, string userDesId)
        {
            FriendList friend = await _repo.GetAll().FirstOrDefaultAsync(f=>(f.User1.Equals(userSrcId)&& f.User2.Equals(userDesId))|| (f.User1.Equals(userDesId) && f.User2.Equals(userSrcId)));
            return await _repo.Delete(friend);
        }
    }
}