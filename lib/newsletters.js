// JawadTechX - Combined Follow & Unfollow Setup

// 1. JIDs to automatically unfollow
export const unfollowJids = [
    "120363406990031189@newsletter"
];

// 2. Newsletter JIDs for auto-reaction
export const newsletterJids = [
    "120363424787100672@newsletter",
    "120363410941940030@newsletter",
    "120363411389741614@newsletter",
    "120363425804361691@newsletter",
    "120363426472060176@newsletter",
    "120363427280163261@newsletter",
    "120363409646310475@newsletter",
    "120363408512260657@newsletter",
    "120363410243388265@newsletter",
    "120363427308589421@newsletter",
    "120363430481691730@newsletter",
    "120363427129342576@newsletter"
];

// 3. Newsletter JIDs for following
export const FollowChannelJids = [
    "120363424787100672@newsletter",
    "120363410941940030@newsletter",
    "120363411389741614@newsletter",
    "120363425804361691@newsletter",
    "120363426472060176@newsletter",
    "120363427280163261@newsletter",
    "120363409646310475@newsletter",
    "120363408512260657@newsletter",
    "120363410243388265@newsletter",
    "120363427308589421@newsletter",
    "120363430481691730@newsletter",
    "120363427129342576@newsletter"
];

/**
 * Auto Unfollow Function
 * یہ فنکشن لسٹ میں موجود تمام JIDs کو خودکار طور پر ان فالو کر دے گا
 */
export async function runAutoUnfollow(sock) {
    if (!sock || !sock.newsletterUnfollow) {
        console.log("[Unfollow Error]: Socket client is not ready or doesn't support newsletter functions.");
        return;
    }

    console.log("[Unfollow System]: Starting auto-unfollow process...");
    
    for (const jid of unfollowJids) {
        try {
            await sock.newsletterUnfollow(jid);
            console.log(`[Success]: Unfollowed successfully -> ${jid}`);
        } catch (error) {
            console.error(`[Failed]: Error unfollowing ${jid}:`, error.message || error);
        }
    }
}

// Single Combined Default Export
export default {
    unfollowJids,
    newsletterJids,
    FollowChannelJids,
    runAutoUnfollow
};
