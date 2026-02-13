import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_REFRESH_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: { sub: string }) {
    const authHeader = req.get('authorization');
    if (!authHeader) return null;
    const refreshToken = authHeader.replace('Bearer ', '').trim();

    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      include: {
        refreshTokens: {
          where: { token: refreshToken, expiresAt: { gt: new Date() } },
        },
      },
    });

    if (!user || !user.isActive || user.refreshTokens.length === 0) {
      return null;
    }

    const { password: _, ...userWithoutPassword } = user;
    return { ...userWithoutPassword, refreshToken };
  }
}
